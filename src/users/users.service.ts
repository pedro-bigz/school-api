import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { RoleHasPermissionsService } from '@app/role_has_permissions/role_has_permissions.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly userRepo: UserRepository,
		private readonly roleHasPermissionsService: RoleHasPermissionsService
	) {}

	async list(): Promise<User[]> {
		return this.userRepo.find();
	}

	async find(email: string): Promise<User | undefined> {
		const user = await this.userRepo.findOne({
			where: { email },
			relations: ['modelHasRoles', 'modelHasRoles.role'],
		});
		return user;
	}

	async userUserPermission(user: any, permission: string) {
		return this.roleHasPermissionsService.authorize(user, permission);
	}

	userHasRole(user: any, role: string): boolean {
		return user.modelHasRoles.some(mhr => {
			return mhr.role.name === role
		});
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
