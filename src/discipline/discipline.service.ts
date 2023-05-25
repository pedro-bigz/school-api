import { BaseListiningRequestResult } from "@app/common/BaseModels/base-listining-request-result.dto";
import { BaseListiningRequest } from "@app/common/BaseModels/base-listining-request.dto";
import { HttpException, Injectable } from "@nestjs/common";
import { DisciplineRepository } from "./discipline.repository";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";
import { DisciplineFilter } from "./dto/discipline-filter.dto";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";
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

  async findAllPaginated(
    params: BaseListiningRequest<DisciplineFilter>
  ): Promise<BaseListiningRequestResult<Discipline>> {
    const per_page = params.per_page || 10;
    const skip = params.per_page * (params.page - 1) || 0;
    const query = this.disciplineRepo.createQueryBuilder("discipline");

    if (params.filters.name != null)
      query.where("discipline.name like: name", {
        name: params.filters.name,
      });

    if (params.filters.goal != null)
      query.where("discipline.goal like : goal", { goal: params.filters.goal });

    if (params.filters.ch_total != null)
      query.where("discipline.ch_total = ch_total", {
        ch_total: params.filters.ch_total,
      });

    if (params.filters.period != null)
      query.where("discipline.period = period", {
        period: params.filters.period,
      });

    const total = await query.getCount();
    const num_pages = total / per_page;
    const data = await query.skip(skip).take(per_page).getMany();
    const next_page = num_pages > params.page;
    const prev_page = params.page > 1;

    return new BaseListiningRequestResult<Discipline>(
      data,
      params.page,
      per_page,
      num_pages,
      next_page,
      prev_page
    );
  }
}
