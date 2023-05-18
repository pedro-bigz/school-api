import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BaseRequestResult {
  constructor(
    statusCode: number,
    message: string,
    data: object | undefined | null = null
  ) {
    (statusCode = statusCode), (message = message), (data = data);
  }

  @ApiProperty()
  @IsNumber()
  status_code: number;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  data: object | any | null;
}
