// Dotenv must be first, before we import anything else
import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Web Quickstart API')
    .setDescription('The Web Quickstart API description')
    .setVersion('0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: false }));

  const port = process.env.PORT ?? 3000;
  console.log('Listening on port', port);

  await app.listen(port);
}
bootstrap();
