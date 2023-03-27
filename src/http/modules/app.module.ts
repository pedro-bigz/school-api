import { UseTermMiddleware } from './../middlewares/use-term.middleware';
import { AuthMiddleware } from './../middlewares/auth.middleware';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersHttpModule } from './users-http.module';
import { AuthModule } from './auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [],
			synchronize: true,
		}),

		UsersHttpModule,
		AuthModule,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(AuthMiddleware, UseTermMiddleware)
		  .exclude('login', 'register')
		  .forRoutes('*');
	}
}
