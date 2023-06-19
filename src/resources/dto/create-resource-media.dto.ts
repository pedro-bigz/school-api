// import { ApiProperty } from "@nestjs/swagger";
// import { IsNotEmpty, IsString } from "class-validator";
import { CreateResourceMediaMetadataDto } from "./create-resource-media-metadata.dto";

export class CreateResourceMediaDto {
  collection_name: string;

  metadata: CreateResourceMediaMetadataDto;

  mime_type: string;

  filename: string;

  action: string;
}
