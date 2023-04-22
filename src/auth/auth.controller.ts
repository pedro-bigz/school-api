import { Request, Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService, ResponseToken } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async signIn(@Body() signInDto: Record<string, any>): Promise<ResponseToken> {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@UseGuards(JwtAuthGuard)
	@Post('refresh')
	async refresh(@Request() req) {
		return this.authService.refresh(req.user);
	}
}
