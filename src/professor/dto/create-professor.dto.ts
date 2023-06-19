import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsEnum} from "class-validator";
import { Sex } from "../enums/sex_enum";

export class CreateProfessorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(Sex)
	sex: Sex;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    photoPath: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    facomPageUrl: string;
}