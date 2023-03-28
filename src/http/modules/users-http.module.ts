import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersHttpModule {}
