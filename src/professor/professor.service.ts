import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import { ProfessorRepository } from './professor.repository';
import { Sex } from "./enums/sex_enum";

@Injectable()
export class ProfessorsService {
  constructor( private readonly professorRepo: ProfessorRepository ){}
  
  
  async create(createProfessorDto: CreateProfessorDto): Promise<Professor  | undefined> {
    const email: string = createProfessorDto.email;

    const professor: Professor = await this.professorRepo.findOne({
      where: { email },
    });

    if (professor != null)
      throw new HttpException(`Professor with email ${email} already exists`, HttpStatus.BAD_REQUEST);

    const newProfessor = new Professor();
    
    newProfessor.name = createProfessorDto.name;
	newProfessor.sex = Sex[createProfessorDto.sex];
    newProfessor.email = createProfessorDto.email;
    newProfessor.photoPath = createProfessorDto.photoPath;
    newProfessor.description = createProfessorDto.description;
    newProfessor.facomPageUrl = createProfessorDto.facomPageUrl;
    
    this.professorRepo.create(newProfessor);
    this.professorRepo.save(newProfessor);
    
    return newProfessor;
  }

  async findAll(): Promise<Professor[]> {
    const professors  = await this.professorRepo.find({
        select: {
		  id:true,
          name: true,
		  sex: true,
          email:true,
          photoPath: true,
          description: true,
          facomPageUrl:true
        },
    });
    return professors;
  }

  async update(
    id: number, 
    updateProfessorDto: UpdateProfessorDto): Promise<Professor> | undefined {
      
      const professor = await this.professorRepo.findOne({
        where: { id },
      });

      const email = updateProfessorDto.email;

      if (professor == null) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      
      professor.name = UpdateProfessorDto.name;
	  professor.sex = Sex[updateProfessorDto.sex];
      professor.description = updateProfessorDto.description;
      professor.facomPageUrl = updateProfessorDto.facomPageUrl;
      professor.photoPath = updateProfessorDto.photoPath;

      await this.professorRepo.update({ email }, professor);
      this.professorRepo.save(professor);

      return professor;      
  }

  async remove(id: number): Promise<string> {
    const professor = await this.professorRepo.findOne({
      where: {id},
    });
    if (professor == null) throw new HttpException("Professor not found", HttpStatus.NOT_FOUND);
    
    this.professorRepo.delete(professor);
    this.professorRepo.save(professor);
    return `Deleted Successfully`;
  }
}
