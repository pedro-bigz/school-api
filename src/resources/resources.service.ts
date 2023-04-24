import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceRepository } from './resources.repository';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourceRepo:ResourceRepository){}

  async list(): Promise<Resource[]> {
    return this.resourceRepo.find();
  }
  create(createResourceDto: CreateResourceDto) {
    const newResource = new Resource();

    newResource.title = createResourceDto.title;
    newResource.description = createResourceDto.description;
    newResource.creatorId = createResourceDto.creatorId;
    newResource.activated = true;
    newResource.createdAt = new Date();

    //Falta esses dados!!!
    // newResource.creatorId
    // newResource.media
    // newResource.discipline

    this.resourceRepo.create(newResource);
    this.resourceRepo.save(newResource);

    return newResource;
  }

  findAll() {
    return `This action returns all resources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  async remove(id: number): Promise<string> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
    });

    resource.deletedAt = new Date();
    this.resourceRepo.delete(resource);

    return "Success";
  }
}
