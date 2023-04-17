import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UserRepository) {}

	async list(): Promise<User[]> {
		return this.userRepo.find();
	}

	async find(email: string): Promise<User | undefined> {
		console.log('validateUser2');
		console.log(await this.list());
		const user = await this.userRepo.findOne({
			where: { email },
			relations: ['modelHasRoles'],
		});
		console.log(user);
		return user;
	}

	create(createUserDto: CreateUserDto) {
		// return this.usersService.create(createUserDto);
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		// return this.usersService.update(+id, updateUserDto);
	}

	remove(id: string) {
		// return this.usersService.remove(+id);
	}
}
