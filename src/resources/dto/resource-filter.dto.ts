import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class ResourceFilter {
  @ApiPropertyOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsNumber()
  creatorId: number;

  @ApiPropertyOptional()
  @IsNumber()
  disciplineId: number;
}
