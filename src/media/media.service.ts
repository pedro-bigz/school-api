import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { Media } from "./entities/media.entity";
import { MediaRepository } from "./media.repository";
import { ResourcesService } from "@app/resources/resources.service";

@Injectable()
export class MediaService {
  constructor(
    @Inject(forwardRef(() => ResourcesService))
    private readonly resourcesService: ResourcesService,
    private readonly mediaRepository: MediaRepository
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = new Media();
    media.collection_name = createMediaDto.collection_name;
    media.filename = createMediaDto.filename;
    media.disk = createMediaDto.disk;
    media.model_type = createMediaDto.model_type;
    media.metadata = createMediaDto.metadata;
    media.model_id = createMediaDto.model_id;

    if (createMediaDto.resourceId == null)
      throw new HttpException("Resource not found!", HttpStatus.NOT_FOUND);

    const resource = await this.resourcesService.findOne(
      createMediaDto.resourceId
    );

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

  async remove(id: number): Promise<string> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (media == null) throw new HttpException("Media not found", 404);

    media.deletedAt = new Date();

    this.mediaRepository.delete(media);
    this.mediaRepository.save(media);

    return "Deleted successfully";
  }
}
