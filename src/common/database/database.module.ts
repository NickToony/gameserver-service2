import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from './default.datasource';

@Module({
  imports: [TypeOrmModule.forRoot(connectionConfig)],
  providers: [],
})
export class DatabaseModule {}
