import { Module } from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { ResourcesController } from "./resources.controller";
import { Resource } from "./entities/resource.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/entities/user.entity";
import { Media } from "@app/media/entities/media.entity";
import { ResourceRepository } from "./resources.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Resource, User, Media])],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourceRepository],
})
export class ResourcesModule {}
