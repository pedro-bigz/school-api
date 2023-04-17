import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerDocumentationAdapter } from './documentation';


async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = SwaggerDocumentationAdapter.create();
	const document = SwaggerModule.createDocument(app, config.getConfig());
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
