import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  media_type: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string; //could be link or path
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  resourceId: number;
}
