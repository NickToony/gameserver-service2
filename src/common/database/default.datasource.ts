import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/models/*.model{.ts,.js}'],
  synchronize: true,
  ssl: process.env.CACERT
    ? {
        rejectUnauthorized: false,
        ca: process.env.CACERT,
      }
    : undefined,
  migrationsRun: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
};
