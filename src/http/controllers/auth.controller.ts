import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Request): Promise<string> {
    const user = await this.authService.validateUser(req.body);

    // if (!user) {
    //   res.
    // }

    return "Login";
  }

  @Post('register')
  register(): string {
    return 'register';
  }

  @Delete('logout')
  logout(): string {
    return this.authService.getHello();
  }
}
