// import { Controller, Get, Post, Delete, Req, UseGuards } from '@nestjs/common';
// import { AuthService } from '../services/auth.service';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';

// @Controller()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   @UseGuards(AuthGuard('local'))
//   async login(@Req() req: Request): Promise<object> {
//     return this.authService.login(req.body);
//   }

//   @Post('register')
//   register(): string {
//     return 'register';
//   }

//   @Delete('logout')
//   logout(): string {
//     return this.authService.getHello();
//   }
// }
import {
  Req,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@app/guards/auth.guard';
import { AuthService } from '@app/http/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Req() req: Request) {
    return this.authService.login(req.body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}