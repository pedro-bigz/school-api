import { User } from './../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../dto/users/create-user.dto';
import { UpdateUserDto } from '../../dto/users/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepo: Repository<User>
	) {}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new User';
	}

	findAll(): Promise<User[]> {
		return this.usersRepo.find();
	}

	findOne(id: number): Promise<User | null> {
		return this.usersRepo.findOneBy({ id });
	}

	findByEmail(email: string): Promise<User | null> {
		return this.usersRepo.findOneBy({ email });
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return this.usersRepo.update(id, updateUserDto);
	}

	async remove(id: number): Promise<void> {
		await this.usersRepo.delete(id);
	}
}
