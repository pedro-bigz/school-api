import { Role } from '@app/roles/roles.enum';
import RoleGuard from '@app/roles/roles.guard';
import { Request, Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService, ResponseToken } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	// @UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: Record<string, any>): Promise<ResponseToken> {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@UseGuards(JwtAuthGuard)
	@Get('refresh')
	refresh(@Request() req) {
		return this.authService.signIn(req.user.email, req.user.password);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	@UseGuards(RoleGuard(Role.Admin))
	getProfile(@Request() req) {
		return req.user;
	}
}
