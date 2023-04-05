import { UsersService } from './users.service';
import { User } from '@app/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser({ email, password }): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ email, password }) {
    const user = await this.validateUser({ email, password });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
