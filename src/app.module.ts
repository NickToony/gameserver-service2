import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './common/health/health.module';
import { DatabaseModule } from './common/database/database.module';
import { LegacyAPIModule } from './modules/legacy-api/legacy-api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    DatabaseModule,
    LegacyAPIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
