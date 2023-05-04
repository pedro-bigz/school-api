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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Str } from "@app/utils/str";
import { File } from "@app/utils/file";

const fs = require("fs");
const path = require("path");

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
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mediaService.findOne(+id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
