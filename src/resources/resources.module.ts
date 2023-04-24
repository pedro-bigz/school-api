import { Module } from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { ResourcesController } from "./resources.controller";
import { Resource } from "./entities/resource.entity";
import { ResourceRepository } from "./resources.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/entities/user.entity";
import { Media } from "@app/media/entities/media.entity";
import { UsersModule } from "@app/users/users.module";
import { MediaModule } from "@app/media/media.module";
import { DisciplineModule } from "@app/discipline/discipline.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource, User, Media]),
    UsersModule,
    DisciplineModule,
    MediaModule,
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService, ResourceRepository],
})
export class ResourcesModule {}
