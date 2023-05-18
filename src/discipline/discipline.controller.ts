import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { DisciplineService } from "./discipline.service";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";
import { BaseRequestResult } from "@app/common/BaseModels/base-Request-Result.dto";
import { BaseRequestMessages } from "@app/common/BaseModels/BaseEnums/BaseRequestMessages.enum";

@Controller("discipline")
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  async create(@Body() createDisciplineDto: CreateDisciplineDto) {
    try {
      const result = await this.disciplineService.create(createDisciplineDto);
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
  async findAll() {
    try {
      const result = await this.disciplineService.findAll();
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
      const result = await this.disciplineService.findOne(+id);
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
  async update(
    @Param("id") id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto
  ) {
    try {
      const result = await this.disciplineService.update(
        +id,
        updateDisciplineDto
      );
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
      await this.disciplineService.remove(+id);
      return new BaseRequestResult(HttpStatus.OK, BaseRequestMessages.Deleted);
    } catch (e) {
      return e;
    }
  }
}
