import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { User } from './entities/user.entity';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	exports: [UsersService],
	providers: [
		...usersProviders,
		UsersService
	]
})
export class UsersModule {}