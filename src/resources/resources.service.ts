import { BaseListiningRequestResult } from "@app/common/BaseModels/base-listining-request-result.dto";
import { BaseListiningRequest } from "@app/common/BaseModels/base-listining-request.dto";
import { MediaService } from "@app/media/media.service";
import { SubjectService } from "@app/subject/subject.service";
import { UsersService } from "@app/users/users.service";
import { HttpException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { ResourceFilter } from "./dto/resource-filter.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { Resource } from "./entities/resource.entity";
import { ResourceRepository } from "./resources.repository";
@Injectable()
export class ResourcesService {
  constructor(
    private readonly resourceRepo: ResourceRepository,
    private readonly userService: UsersService,
    private readonly subjectService: SubjectService,
    @Inject(forwardRef(() => MediaService))
    private readonly mediaService: MediaService
  ) {}

  async list(): Promise<Resource[]> {
    return this.resourceRepo.find();
  }
  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const newResource = new Resource();

    const subjectId = createResourceDto.subjectId;
    const creatorId = createResourceDto.creatorId;

    newResource.title = createResourceDto.title;
    newResource.description = createResourceDto.description;
    newResource.creatorId = createResourceDto.creatorId;
    newResource.activated = true;
    newResource.createdAt = new Date();

    const subject = await this.subjectService.findOne(subjectId);

    const creator = await this.userService.findById(creatorId);

    newResource.creator = creator;
    newResource.subject = subject;

    this.resourceRepo.create(newResource);
    const resource = await this.resourceRepo.save(newResource);

    if (createResourceDto.media != null) {
      createResourceDto.media.resourceId = resource.id;

      const media = await this.mediaService.create(createResourceDto.media);

      if (media == null) throw new HttpException("Fail at media creation", 500);
    }

    return newResource;
  }

  async findAll(): Promise<Resource[]> {
    return await this.resourceRepo.find();
  }

  async findAllPaginated(
    params: BaseListiningRequest<ResourceFilter>
  ): Promise<BaseListiningRequestResult<Resource>> {
    const per_page = params.per_page || 10;
    const skip = params.per_page * (params.page - 1) || 0;
    const query = this.resourceRepo.createQueryBuilder("resource");

    if (params.filters != null) {
      if (params.filters.title != null)
        query.where("resource.title like :title", {
          title: params.filters.title,
        });

      if (params.filters.description != null)
        query.where("resource.description like :desc", {
          desc: params.filters.description,
        });

      if (params.filters.subjectId != null)
        query
          .leftJoin("resource.subject", "disc")
          .where("disc.id = id", { id: params.filters.subjectId });

      if (params.filters.creatorId != null)
        query.where("resource.creatorId = creatorId", {
          creatorId: params.filters.creatorId,
        });
    }
    const total = await query.getCount();
    const num_pages = total / per_page;
    const data = await query.skip(skip).take(per_page).getMany();
    const next_page = num_pages > params.page;
    const prev_page = params.page > 1;

    return new BaseListiningRequestResult<Resource>(
      data,
      params.page,
      per_page,
      num_pages,
      next_page,
      prev_page
    );
  }

  async findOne(id: number): Promise<Resource> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
      relations: ["subject", "media"],
    });
    if (resource == null) throw new HttpException("Resource not found", 404);

    return resource;
  }

  async update(
    id: number,
    updateResourceDto: UpdateResourceDto
  ): Promise<Resource> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
      relations: ["subject", "media"],
    });

    (resource.description = updateResourceDto.description),
      (resource.title = updateResourceDto.title);

    this.resourceRepo.update({ id }, resource);
    this.resourceRepo.save(resource);

    return resource;
  }

  async remove(id: number): Promise<string> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
      relations: ["media"],
    });

    if (resource == null) throw new HttpException("Resource not found", 404);

    resource.deletedAt = new Date();

    resource.media.forEach((mediaAlocated) => {
      mediaAlocated.deletedAt = new Date();
      this.subjectService.remove(mediaAlocated.id);
    });

    this.resourceRepo.delete(resource);
    this.resourceRepo.save(resource);

    return "Success";
  }
}
