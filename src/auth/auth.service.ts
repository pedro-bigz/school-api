import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser({ email, password }): Promise<any> {
		const user = await this.usersService.find(email);
		console.log(user);
		if (user && await compare(password, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		throw new UnauthorizedException();
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async signIn(email: string, password: string) {
		try {
			console.log(email, password);
			const user = await this.validateUser({ email, password })
			return this.login(user);
		} catch (e) {
			return e.response;
		}
	}
}
