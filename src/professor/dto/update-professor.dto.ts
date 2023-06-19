import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Sex } from "../enums/sex_enum";


export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
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
