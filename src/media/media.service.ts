import { HttpException, Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./entities/media.entity";
import { ResourceRepository } from "@app/resources/resources.repository";
import { Resource } from "@app/resources/entities/resource.entity";
import { MediaRepository } from "./media.repository";

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async create(
    createMediaDto: CreateMediaDto,
    resource?: Resource
  ): Promise<Media> {
    const media = new Media();
    media.filename = createMediaDto.filename;
    media.address = createMediaDto.address;
    media.media_type = createMediaDto.media_type;

    if (resource != null) media.resource = resource;

    this.mediaRepository.create(media);

    this.mediaRepository.save(media);

    return media;
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaRepository.find();
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (media == null) throw new HttpException("Media not found", 404);
    return media;
  }

  // update(id: number, updateMediaDto: UpdateMediaDto) {
  //   return `This action updates a #${id} media`;
  // }

  async remove(id: number): Promise<string> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (media == null) throw new HttpException("Media not found", 404);

    media.deletedAt = new Date();

    this.mediaRepository.delete(media);
    this.mediaRepository.save(media);

    return "Deleted successfully";
  }
}
