import { HttpException, Injectable } from "@nestjs/common";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";
import { DisciplineRepository } from "./discipline.repository";
import { Discipline } from "./entities/discipline.entity";

@Injectable()
export class DisciplineService {
  constructor(private readonly disciplineRepo: DisciplineRepository) {}
  create(createDisciplineDto: CreateDisciplineDto): Discipline {
    // const name = createDisciplineDto.name;

    // const disciplineExists = this.disciplineRepo.findOne({
    //   where: { name },
    // });

    // if (disciplineExists != null)
    //   throw new HttpException("This discipline already exists", 400);

    const discipline = new Discipline();
    discipline.name = createDisciplineDto.name;
    discipline.period = createDisciplineDto.period;
    discipline.goal = createDisciplineDto.goal;
    discipline.ch_total = createDisciplineDto.ch_total;
    discipline.curriculum = createDisciplineDto.curriculum;
    discipline.createdAt = new Date();

    this.disciplineRepo.create(discipline);

    this.disciplineRepo.save(discipline);

    return discipline;
  }

  async findAll(): Promise<Discipline[]> {
    return await this.disciplineRepo.find();
  }

  async findOne(id: number): Promise<Discipline> {
    const discipline = await this.disciplineRepo.findOne({ where: { id } });

    if (discipline == null)
      throw new HttpException("Discipline not found", 404);

    return discipline;
  }

  async update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    const discipline = await this.disciplineRepo.findOne({ where: { id } });

    if (discipline == null)
      throw new HttpException("Discipline not found", 404);

    discipline.name = updateDisciplineDto.name;
    discipline.period = updateDisciplineDto.period;
    discipline.goal = updateDisciplineDto.goal;
    discipline.ch_total = updateDisciplineDto.ch_total;
    discipline.curriculum = updateDisciplineDto.curriculum;
    discipline.createdAt = new Date();

    this.disciplineRepo.update(id, discipline);

    this.disciplineRepo.save(discipline);

    return discipline;
  }

  async remove(id: number): Promise<string> {
    const discipline = await this.disciplineRepo.findOne({ where: { id } });

    if (discipline == null)
      throw new HttpException("Discipline not found", 404);

    discipline.deletedAt = new Date();

    this.disciplineRepo.delete(discipline);
    this.disciplineRepo.save(discipline);

    return "Deleted Successfully";
  }
}
