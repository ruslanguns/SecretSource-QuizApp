import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('QuizAPI');
  const configService = app.get(ConfigService);
  const port = configService.get<number>(SERVER_PORT) || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']
  });

  await app.listen(port);

  logger.verbose(`Server is running on ${await app.getUrl()}`)
}
bootstrap();
