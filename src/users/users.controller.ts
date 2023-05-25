import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "@app/auth/jwt-auth.guard";
import { BaseRequestMessages } from "@app/common/BaseModels/BaseEnums/base-request-messages.enum";
import { BaseRequestResult } from "@app/common/BaseModels/base-request-result.dto";
import { Order } from "@app/common/BaseModels/BaseEnums/order.enum";
import { BaseListiningRequest } from "@app/common/BaseModels/base-listining-request.dto";
import { UserFilter } from "./dto/user-filter.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.usersService.create(createUserDto);
      return new BaseRequestResult(
        HttpStatus.CREATED,
        BaseRequestMessages.Created,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Get()
  async list() {
    try {
      const result = await this.usersService.list();
      const response = new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
      console.log({ response });
      return response;
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
  @Get(":id")
  async find(@Param("id") id: string) {
    try {
      const result = await this.usersService.findById(+id);
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersService.update(+id, updateUserDto);
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Updated,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.usersService.remove(+id);
      return new BaseRequestResult(HttpStatus.OK, BaseRequestMessages.Deleted);
    } catch (e) {
      return e;
    }
  }

  @Post("/paginated")
  async listPaginated(
    @Query("order") order: Order,
    @Query("page") page: number,
    @Query("take") take: number,
    @Body() filter: UserFilter
  ) {
    try {
      const parametersOfSearch: BaseListiningRequest<UserFilter> =
        new BaseListiningRequest<UserFilter>(order, page, take, filter);

      const result = await this.usersService.findAllPaginated(
        parametersOfSearch
      );
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
    } catch (e) {
      return e;
    }
  }
}
// @UseGuards(PermissionsGuard("teste"))
