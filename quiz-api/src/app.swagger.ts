import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Quiz Application API Docs')
    .addBearerAuth()
    .setDescription(
      `This application is a API Rest for a web application which implements a basic Quiz 
      App flow which allows you to learn german by answering questions. As a player you will 
      be able to answer the quiz in just one opportunity, you will be promped when new question 
      arise and it will store your score and history.`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
};