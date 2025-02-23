import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerModel } from 'src/common/database/models/server.model';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class CleanupWorker {
  constructor(
    @InjectRepository(ServerModel)
    private readonly serverRepository: Repository<ServerModel>,
  ) {}

  @Cron('0 * * * * *')
  async handleCron() {
    await this.serverRepository.delete({
      updatedAt: Raw((alias) => `${alias} < NOW() - INTERVAL '5 MINUTEs'`),
    });
  }
}
