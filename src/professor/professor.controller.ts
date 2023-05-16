import { Controller, Get, Post, Body,
  Patch, Param, Delete } from '@nestjs/common';
import { ProfessorsService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Professores')
@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorsService) {}

  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.professorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
  //   return this.professorService.update(+id, updateProfessorDto);
  // }


}
