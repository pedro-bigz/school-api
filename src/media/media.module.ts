import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { Resource } from "@app/resources/entities/resource.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { UsersModule } from "@app/users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Media]), UsersModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
