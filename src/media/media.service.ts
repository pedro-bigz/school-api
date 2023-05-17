import { HttpException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { Media } from "./entities/media.entity";
import { MediaRepository } from "./media.repository";
import { ResourcesService } from "@app/resources/resources.service";
import { UploadS3Service } from "@app/s3/s3Bucket.service";
import * as fs from "fs";
import { Resource } from "@app/resources/entities/resource.entity";

@Injectable()
export class MediaService {
  constructor(
    @Inject(forwardRef(() => ResourcesService))
    private readonly resourcesService: ResourcesService,
    private readonly mediaRepository: MediaRepository,
    private readonly uploadS3Service: UploadS3Service
  ) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = new Media();
    media.collection_name = createMediaDto.collection_name;
    media.filename = createMediaDto.filename;
    media.disk = createMediaDto.disk;
    media.model_type = createMediaDto.model_type;
    media.metadata = createMediaDto.metadata;
    media.model_id = createMediaDto.model_id;

    let resource = new Resource();
    if (createMediaDto.resourceId != null)
      resource = await this.resourcesService.findOne(createMediaDto.resourceId);

    if (resource != null) media.resource = resource;

    const myFile = await this.readFile(media.disk);

    const file = Buffer.from(myFile, "base64");

    await this.uploadS3Service.uploadFileToBucket(
      `${media.collection_name}/${media.model_type}/${media.model_id}/${media.filename}`,
      file,
      process.env.AWS_BUCKET_NAME
    );

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

  private readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
