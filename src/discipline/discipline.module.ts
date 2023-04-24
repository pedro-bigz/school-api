import { Module } from "@nestjs/common";
import { DisciplineService } from "./discipline.service";
import { DisciplineController } from "./discipline.controller";
import { DisciplineRepository } from "./discipline.repository";
import { Discipline } from "./entities/discipline.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplineController],
  exports: [DisciplineService],
  providers: [DisciplineService, DisciplineRepository],
})
export class DisciplineModule {}
