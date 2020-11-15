import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
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

  await app.listen(port);

  logger.verbose(`Server is running on ${await app.getUrl()}`)
}
bootstrap();
