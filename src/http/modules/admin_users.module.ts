import { Module } from '@nestjs/common';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUsersController } from '../controllers/admin_users.controller';

@Module({
  controllers: [AdminUsersController],
  providers: [AdminUsersService]
})
export class AdminUsersModule {}
