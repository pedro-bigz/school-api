import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Discipline } from "./entities/discipline.entity";

@Injectable()
export class DisciplineRepository extends Repository<Discipline> {
  constructor(
    @InjectRepository(Discipline) repository: Repository<Discipline>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
