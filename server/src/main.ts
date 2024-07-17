require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import * as cookieParser from "cookie-parser";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '5mb' }));

  app.enableCors({ credentials: true, origin: true });
  app.use(cookieParser());
  app.disable('x-powered-by');
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
