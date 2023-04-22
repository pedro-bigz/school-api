import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { ResourcesModule } from '@app/resources/resources.module';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { RolesModule } from '@app/roles/roles.module';
import { ModelHasRolesModule } from '@app/model_has_roles/model_has_roles.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from '@app/common/helper/env.helper';
import { User } from './users/entities/user.entity';
import { ModelHasRole } from './model_has_roles/entities/model_has_role.entity';
import { Role } from './roles/entities/role.entity';
import { Resource } from './resources/entities/resource.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleHasPermissionsModule } from './role_has_permissions/role_has_permissions.module';
import { RoleHasPermission } from './role_has_permissions/entities/role_has_permission.entity';
import { Permission } from './permissions/entities/permission.entity';
import { MediaController } from './media/media.controller';

type TypeOrmModuleOptionType = "mysql" | "mariadb" | "postgres";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: getEnvPath(`${__dirname}/common/envs`),
			isGlobal: true
		}),
		UsersModule,
		AuthModule,
		ResourcesModule,
		RolesModule,
		PermissionsModule,
		ModelHasRolesModule,
		RolesModule,
		PermissionsModule,
		RoleHasPermissionsModule,
		TypeOrmModule.forRoot({
			type: process.env.DB_CONNECTION as TypeOrmModuleOptionType,
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [
				User,
				Role,
				Resource,
				Permission,
				ModelHasRole,
				RoleHasPermission,
			],
			synchronize: false,
		}),
		PermissionsModule,
		RoleHasPermissionsModule,
	],
	controllers: [AppController, MediaController],
	providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}