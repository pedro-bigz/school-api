import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
    	@InjectRepository(User)
		private userRepo: Repository<User>,
	) {}

	async list(): Promise<User[]> {
		return this.userRepo.find();
	}

	async find(email: string): Promise<User | undefined> {
	  	return this.userRepo.findOneBy({ email });
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
