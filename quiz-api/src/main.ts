import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('QuizAPI');
  await app.listen(process.env.SERVER_PORT || 3000);
  logger.verbose(`Server is running on ${await app.getUrl()}`)
}
bootstrap();
