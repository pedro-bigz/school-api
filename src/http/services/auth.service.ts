import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser({ username, password }): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && await compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
