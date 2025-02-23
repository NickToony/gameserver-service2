import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameModel } from 'src/common/database/models/game.model';
import { ServerModel } from 'src/common/database/models/server.model';
import { Repository } from 'typeorm';
import { ServerDto } from '../dtos/server.dto';
import * as crypto from 'crypto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerModel)
    private readonly serverRepository: Repository<ServerModel>,
    @InjectRepository(GameModel)
    private readonly gameRepository: Repository<GameModel>,
  ) {}

  async getPaginatedServers(gameId: number, page: number = 0) {
    const pageSize = 100;
    const [data, total] = await this.serverRepository.findAndCount({
      where: { gameId },
      take: pageSize,
      skip: page * pageSize,
    });
    return {
      data,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      totalRows: total,
    };
  }

  async addServer(
    gameId: number,
    name: string,
    currentPlayers: number,
    maxPlayers: number,
    metadata?: Map<string, string>,
    ip?: string,
    port?: string,
  ): Promise<ServerDto> {
    const model = await this.serverRepository.save({
      name,
      currentPlayers,
      maxPlayers,
      metadata: this.combineLegacyMetadata(metadata, ip, port),
      password: crypto.randomBytes(32).toString('hex'),
      gameId,
    });

    return {
      id: model.id,
      password: model.password,
      name: model.name,
      maxPlayers: model.maxPlayers,
      currentPlayers: model.currentPlayers,
      metadata: model.metadata,
    };
  }

  async updateServer(
    id: number,
    password: string,
    name: string,
    currentPlayers: number,
    maxPlayers: number,
    metadata?: Map<string, string>,
    ip?: string,
    port?: string,
  ): Promise<ServerDto | undefined> {
    const server = await this.serverRepository.findOneBy({ id });
    if (!server || server.password !== password) {
      return undefined;
    }

    await this.serverRepository.update(id, {
      name,
      currentPlayers,
      maxPlayers,
      metadata: this.combineLegacyMetadata(metadata, ip, port),
    });

    return {
      id: server.id,
      password: server.password,
      name: server.name,
      maxPlayers: server.maxPlayers,
      currentPlayers: server.currentPlayers,
      metadata: server.metadata,
    };
  }

  getGameByKey(key: string): Promise<GameModel> {
    return this.gameRepository.findOneBy({ apiKey: key });
  }

  combineLegacyMetadata(
    metadata?: Map<string, string>,
    ip?: string,
    port?: string,
  ): Map<string, string> {
    const result = metadata ? metadata : new Map<string, string>();
    if (ip) {
      result.set('ip', ip);
    }
    if (port) {
      result.set('port', port);
    }
    return result;
  }
}
