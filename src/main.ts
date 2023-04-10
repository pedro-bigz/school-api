import { NestFactory } from '@nestjs/core';
import { AppModule } from './http/modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Documentação das Endpoints')
    .setVersion('1.0')
    .addTag('Usuários')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
