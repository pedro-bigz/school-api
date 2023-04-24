import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async list(): Promise<User[]> {
    return this.userRepo.find();
  }

  async find(email: string): Promise<User | undefined> {
    console.log("validateUser2");
    console.log(await this.list());
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ["modelHasRoles"],
    });
    console.log(user);
    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (user == null) throw new HttpException("User not found", 404);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> | undefined {
    const email = createUserDto.email;

    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (user != null)
      throw new HttpException(`User with email ${email} already exists`, 400);

    const newUser = new User();

    const nameArr = createUserDto.name.split(" ");

    newUser.firstName = nameArr[0];
    newUser.lastName = nameArr[nameArr.length - 1];
    newUser.password = createUserDto.password;
    newUser.email = createUserDto.email;
    newUser.createdAt = new Date();
    newUser.activated = true;

    this.userRepo.create(newUser);
    this.userRepo.save(newUser);

    return newUser;
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

    const nameArr = updateUserDto.name.split(" ");

    user.firstName = nameArr[0];
    user.lastName = nameArr[nameArr.length - 1];
    user.password = updateUserDto.password;
    user.email = updateUserDto.email;
    user.updatedAt = new Date();
    user.activated = true;

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

    this.userRepo.delete(user);
    this.userRepo.save(user);

    return "Deleted Successfully";
  }
}
