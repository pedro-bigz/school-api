import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserRepository } from "./users.repository";
import { RoleHasPermissionsService } from "@app/role_has_permissions/role_has_permissions.service";
import { hash } from "bcrypt";
import { Sex } from "./enums/sex_enum";
import { BaseListiningRequest } from "@app/common/BaseModels/base-listining-request.dto";
import { UserFilter } from "./dto/user-filter.dto";
import { BaseListiningRequestResult } from "@app/common/BaseModels/base-listining-request-result.dto";

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
    newUser.register_number = createUserDto.ufuRegister;

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
    user.sex = Sex[updateUserDto.sex];
    user.register_number = updateUserDto.ufuRegister;
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

  async findAllPaginated(
    params: BaseListiningRequest<UserFilter>
  ): Promise<BaseListiningRequestResult<User>> {
    const per_page = params.per_page || 10;
    const skip = params.per_page * (params.page - 1) || 0;
    const query = this.userRepo.createQueryBuilder("user");

    if (params.filters.firstName != null)
      query.where("user.firstName like :firstName", {
        firstName: params.filters.firstName,
      });

    if (params.filters.lastName != null)
      query.where("user.lastName like :lastName", {
        lastName: params.filters.lastName,
      });

    if (params.filters.email != null)
      query.where("user.email like :email", { email: params.filters.email });

    if (params.filters.register_number != null)
      query.where("user.register_number like :register_number", {
        register_number: params.filters.register_number,
      });

    if (params.filters.sex != null)
      query.where("user.sex = sex", { sex: Sex[params.filters.sex] });

    const total = await query.getCount();
    const num_pages = total / per_page;
    const data = await query.skip(skip).take(per_page).getMany();
    const next_page = num_pages > params.page;
    const prev_page = params.page > 1;

    return new BaseListiningRequestResult<User>(
      data,
      params.page,
      per_page,
      num_pages,
      next_page,
      prev_page
    );
  }
}
