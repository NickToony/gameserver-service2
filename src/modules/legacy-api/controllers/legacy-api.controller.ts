import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateServerRequest } from '../interfaces/create-server.request';
import { UpdateServerRequest } from '../interfaces/update-server.request';
import { ServerService } from '../services/server.service';
import { CreateServerResponse } from '../interfaces/create-server.response';
import { UpdateServerResponse } from '../interfaces/update-server.response';
import { GetServersResponse } from '../interfaces/get-servers.response';

@Controller('api')
export class LegacyApiController {
  constructor(private readonly serverService: ServerService) {}

  @Get('/game/:key')
  async getServersForGame(
    @Param('key') key: string,
    @Query('page') page?: number | undefined,
  ): Promise<GetServersResponse> {
    const game = await this.serverService.getGameByKey(key);
    if (!game) {
      throw new NotFoundException();
    }

    const servers = await this.serverService.getPaginatedServers(
      game.id,
      page ? page - 1 : undefined,
    );
    return {
      data: servers.data.map((server) => ({
        id: server.id,
        name: server.name,
        current_players: server.currentPlayers,
        max_players: server.maxPlayers,
        meta: server.metadata,
      })),
      per_page: servers.pageSize,
      current_page: servers.page + 1,
      last_page: servers.totalPages + 1,
      total: servers.totalRows,
      from: (servers.page + 1) * servers.pageSize,
      to: (servers.page + 2) * servers.pageSize,
    };
  }

  @Post('/game/:key')
  async addServer(
    @Param('key') key: string,
    @Body() payload: CreateServerRequest,
  ): Promise<CreateServerResponse> {
    const game = await this.serverService.getGameByKey(key);
    if (!game) {
      throw new NotFoundException();
    }

    const server = await this.serverService.addServer(
      game.id,
      payload.name,
      payload.current_players,
      payload.max_players,
      payload.metadata,
      payload.ip,
      payload.port,
    );
    return {
      success: true,
      id: server.id.toString(),
      password: server.password,
      errors: {},
    };
  }

  @Post('/game/:key/:serverId')
  async updateServer(
    @Param('key') key: string,
    @Param('serverId') serverId: number,
    @Body() payload: UpdateServerRequest,
  ): Promise<UpdateServerResponse> {
    const game = await this.serverService.getGameByKey(key);
    if (!game) {
      throw new NotFoundException();
    }

    const server = await this.serverService.updateServer(
      serverId,
      payload.password,
      payload.name,
      payload.current_players,
      payload.max_players,
      payload.metadata,
      payload.ip,
      payload.port,
    );

    return {
      success: !!server,
      errors: {},
    };
  }
}
