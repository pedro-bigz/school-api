import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { ResourcesModule } from '@app/resources/resources.module';
import { DatabaseModule } from '@app/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/users/entities/user.entity';
// import configuration from './config/configuration';

@Module({
	imports: [
		// ConfigModule.forRoot(),
		DatabaseModule,
		UsersModule,
		AuthModule,
		ResourcesModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'didatikos',
			password: 'Didatikos@1010',
			database: 'school',
			entities: [User],
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
// export class AppModule implements NestModule {
// 	configure(consumer: MiddlewareConsumer) {
// 		consumer
// 			.apply(AuthenticateMiddleware)
// 			.exclude('login', 'register')
// 			.forRoutes('*');
//   }
// }
