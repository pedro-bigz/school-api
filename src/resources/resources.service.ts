import { HttpException, Injectable } from "@nestjs/common";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { ResourceRepository } from "./resources.repository";
import { Resource } from "./entities/resource.entity";
import { UsersService } from "@app/users/users.service";
import { DisciplineService } from "@app/discipline/discipline.service";
import { MediaService } from "@app/media/media.service";
@Injectable()
export class ResourcesService {
  constructor(
    private readonly resourceRepo: ResourceRepository,
    private readonly userService: UsersService,
    private readonly disciplineService: DisciplineService,
    private readonly mediaService: MediaService
  ) {}

  async list(): Promise<Resource[]> {
    return this.resourceRepo.find();
  }
  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const newResource = new Resource();

    const disciplineId = createResourceDto.disciplineId;
    const creatorId = createResourceDto.creatorId;

    newResource.title = createResourceDto.title;
    newResource.description = createResourceDto.description;
    newResource.creatorId = createResourceDto.creatorId;
    newResource.activated = true;
    newResource.createdAt = new Date();

    const discipline = await this.disciplineService.findOne(disciplineId);

    const creator = await this.userService.findById(creatorId);

    newResource.creator = creator;
    newResource.discipline = discipline;

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

  async findOne(id: number): Promise<Resource> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
      relations: ["discipline", "media"],
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
      relations: ["discipline", "media"],
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
      this.disciplineService.remove(mediaAlocated.id);
    });

    this.resourceRepo.delete(resource);
    this.resourceRepo.save(resource);

    return "Success";
  }
}
