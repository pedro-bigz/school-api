import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { ResourcesModule } from '@app/resources/resources.module';
import { DatabaseModule } from '@app/database/database.module';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { RolesModule } from '@app/roles/roles.module';
import { ModelHasRolesModule } from '@app/model_has_roles/model_has_roles.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/configuration';
import { getEnvPath } from '@app/common/helper/env.helper';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

type TypeOrmModuleOptionType = "mysql" | "mariadb";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath, isGlobal: true }),
		DatabaseModule,
		UsersModule,
		AuthModule,
		ResourcesModule,
		RolesModule,
		ModelHasRolesModule,
		TypeOrmModule.forRoot({
			type: process.env.DB_CONNECTION as TypeOrmModuleOptionType,
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [],
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
