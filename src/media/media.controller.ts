import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Str } from '@app/utils/str';
import { File } from '@app/utils/file';

const fs = require('fs');
const path = require('path');

@Controller('media')
export class MediaController {
    @Post('upload')
	@UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const filename = Str.random(40);
        const extension = File.extname(file.originalname);
        const basename = File.getUploadPath(filename + extension);

        console.log(file, basename)

        try {
            await File.upload(basename, file.buffer);

            return {
                statusCode: 200,
                message: "Operation succeeded"
            }
        } catch (e) {
            return {
                statusCode: 422,
                message: "File not provided"
            }
        }
    }
}
