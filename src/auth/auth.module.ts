import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@app/auth/auth.service';
import { AuthController } from '@app/auth/auth.controller';
import { UsersModule } from '@app/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@app/auth/local.strategy';
import { JwtStrategy } from '@app/auth/jwt.strategy';
import { jwtConstants } from '@app/auth/constants';
import { UsersService } from '@app/users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
