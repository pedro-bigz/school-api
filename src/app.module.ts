import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticateMiddleware } from './common/middlewares/authenticate.middleware';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { ResourcesModule } from '@app/resources/resources.module';
import { DatabaseModule } from './database/database.module';
// import configuration from './config/configuration';

@Module({
	imports: [
		ConfigModule.forRoot(),
		DatabaseModule,
		UsersModule,
		AuthModule,
		ResourcesModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule {
// 	configure(consumer: MiddlewareConsumer) {
// 		consumer
// 			.apply(AuthenticateMiddleware)
// 			.exclude('login', 'register')
// 			.forRoutes('*');
//   }
// }
