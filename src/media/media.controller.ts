import { JwtAuthGuard } from "@app/auth/jwt-auth.guard";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { File } from "@app/utils/file";
import { BaseRequestResult } from "@app/common/BaseModels/base-request-result.dto";
import { BaseRequestMessages } from "@app/common/BaseModels/BaseEnums/base-request-messages.enum";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("upload")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const pathinfo = File.create(file.originalname);

    try {
      await File.upload(pathinfo.path, file.buffer);

      return {
        statusCode: 200,
        message: "Operation succeeded",
        path: pathinfo.basename,
      };
    } catch (e) {
      return {
        statusCode: 422,
        message: "File not provided",
      };
    }
  }

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    try {
      const result = await this.mediaService.create(createMediaDto);
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
      const result = await this.mediaService.findAll();
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
      const result = await this.mediaService.findAll();
      return new BaseRequestResult(
        HttpStatus.OK,
        BaseRequestMessages.Found,
        result
      );
    } catch (e) {
      return e;
    }
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.mediaService.remove(+id);
      return new BaseRequestResult(HttpStatus.OK, BaseRequestMessages.Deleted);
    } catch (e) {
      return e;
    }
  }
}
