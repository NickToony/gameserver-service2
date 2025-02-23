import { Module } from '@nestjs/common';
import { LegacyApiController } from './controllers/legacy-api.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModel } from 'src/common/database/models/game.model';
import { ServerModel } from 'src/common/database/models/server.model';
import { ServerService } from './services/server.service';

@Module({
  controllers: [LegacyApiController],
  imports: [DatabaseModule, TypeOrmModule.forFeature([GameModel, ServerModel])],
  providers: [ServerService],
})
export class LegacyAPIModule {}
