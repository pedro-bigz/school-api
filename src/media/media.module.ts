import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { Resource } from "@app/resources/entities/resource.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
