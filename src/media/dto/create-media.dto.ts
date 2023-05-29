import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model_type: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  model_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  collection_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  metadata: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disk: string;

  @ApiProperty()
  @IsNumber()
  resourceId: number;
}
