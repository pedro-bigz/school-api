import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ModelHasRole } from '@app/model_has_roles/entities/model_has_role.entity';
import { Resource } from '@app/resources/entities/resource.entity';
import { ResourcesModule } from '@app/resources/resources.module';
import { ModelHasRolesModule } from '@app/model_has_roles/model_has_roles.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), ResourcesModule, ModelHasRolesModule],
	controllers: [UsersController],
	exports: [UsersService],
	providers: [
		UsersService
	]
})
export class UsersModule {
	constructor(private dataSource: DataSource) {}
}