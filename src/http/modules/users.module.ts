import { User } from './../../entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '@app/database/database.module';
import { UsersService } from '@app/http/services/users.service';
import { userProviders } from '@app/providers/user.providers';

console.log('env', process.env.DB_CONNECTION);

@Module({
  	imports: [DatabaseModule],
	providers: [
		...userProviders,
		UsersService,
	],
  	exports: [TypeOrmModule],
})
export class UsersModule {}
