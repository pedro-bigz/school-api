import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class BaseListiningRequestResult<T> {
  constructor(data: T[], page: number, take: number, total: number) {
    this.data = data;
    this.page = page;
    this.take = take;
    this.total = total;
  }

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  total?: number;

  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];
}
