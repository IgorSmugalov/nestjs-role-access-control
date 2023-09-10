import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth({
      description: 'access token',
      type: 'http',
      name: 'Access Token',
    })
    .setTitle('Role Access Control for NestJs example app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
