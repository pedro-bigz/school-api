import { NestFactory } from '@nestjs/core';
import { AppModule } from './http/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
