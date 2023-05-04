import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./users.repository";
import { RoleHasPermissionsService } from "@app/role_has_permissions/role_has_permissions.service";
import { hash } from "bcrypt";
import { Sex } from "./enums/sex_enum";

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
      relations: ["modelHasRoles", "modelHasRoles.role"],
    });
    return user;
  }

  async userUserPermission(user: any, permission: string) {
    return this.roleHasPermissionsService.authorize(user, permission);
  }

  userHasRole(user: any, role: string): boolean {
    return user.modelHasRoles.some((mhr) => {
      return mhr.role.name === role;
    });
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (user == null) throw new HttpException("User not found", 404);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<any> | undefined {
    const email = createUserDto.email;

    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (user != null)
      throw new HttpException(`User with email ${email} already exists`, 400);

    const newUser = new User();

    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.password = await hash(
      createUserDto.password,
      parseInt(process.env.HASH_SALT)
    );
    newUser.email = createUserDto.email;
    newUser.createdAt = new Date();
    newUser.activated = true;
    newUser.sex = Sex[createUserDto.sex];

    this.userRepo.create(newUser);
    this.userRepo.save(newUser);

    const { password, ...register } = newUser;

    return register;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> | undefined {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    const email = updateUserDto.email;

    if (user == null) throw new HttpException("User not found", 404);

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.password = updateUserDto.password;
    user.email = updateUserDto.email;
    user.updatedAt = new Date();

    await this.userRepo.update({ email }, user);
    this.userRepo.save(user);

    return user;
  }

  async remove(id: number): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (user == null) throw new HttpException("User not found", 404);

    user.deletedAt = new Date();
    user.activated = false;

    this.userRepo.delete(user);
    this.userRepo.save(user);

    return "Deleted Successfully";
  }
}
