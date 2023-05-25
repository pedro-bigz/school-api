import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { BaseRequestResult } from "@app/common/BaseModels/base-request-result.dto";
import { BaseRequestMessages } from "@app/common/BaseModels/BaseEnums/base-request-messages.enum";
import { BaseListiningRequest } from "@app/common/BaseModels/base-listining-request.dto";
import { ResourceFilter } from "./dto/resource-filter.dto";
import { Order } from "@app/common/BaseModels/BaseEnums/order.enum";

@Controller("resources")
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async list() {
    try {
      const result = await this.resourcesService.findAll();
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Post("/paginated")
  async listPaginated(
    @Query("order") order: Order,
    @Query("page") page: number,
    @Query("take") take: number,
    @Body() filter: ResourceFilter
  ) {
    try {
      const parametersOfSearch: BaseListiningRequest<ResourceFilter> =
        new BaseListiningRequest<ResourceFilter>(order, page, take, filter);

      const result = await this.resourcesService.findAllPaginated(
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

  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      const result = await this.resourcesService.findOne(+id);
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Post()
  async create(@Body() createResourceDto: CreateResourceDto) {
    try {
      const result = await this.resourcesService.create(createResourceDto);
      return new BaseRequestResult(
        HttpStatus.CREATED,
        BaseRequestMessages.Created,
        result
      );
    } catch (e) {
      return e;
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateResourceDto: UpdateResourceDto
  ) {
    try {
      const result = await this.resourcesService.update(+id, updateResourceDto);
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
      await this.resourcesService.remove(+id);
      return new BaseRequestResult(HttpStatus.OK, BaseRequestMessages.Deleted);
    } catch (e) {
      return e;
    }
  }
}
