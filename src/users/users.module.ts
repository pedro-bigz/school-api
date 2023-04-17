import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@app/users/users.service';
import { UsersController } from '@app/users/users.controller';
import { User } from '@app/users/entities/user.entity';
import { ResourcesModule } from '@app/resources/resources.module';
import { ModelHasRolesModule } from '@app/model_has_roles/model_has_roles.module';
import { UserRepository } from '@app/users/users.repository';

@Module({
	imports: [TypeOrmModule.forFeature([User]), ResourcesModule, ModelHasRolesModule],
	controllers: [UsersController],
	exports: [UsersService],
	providers: [UsersService, UserRepository]
})
export class UsersModule {
	constructor(private dataSource: DataSource) {}
}