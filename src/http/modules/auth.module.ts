import { UsersService } from '@app/http/services/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from '@app/http/services/auth.service';
import { AuthController } from '@app/http/controllers/auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
