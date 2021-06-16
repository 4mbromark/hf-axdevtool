import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const ANGULAR = process.env.ANGULAR;

  const app = await NestFactory.create(AppModule);
  app.use(express.static(ANGULAR));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
