import { HttpException, Injectable } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor } from './entities/professor.entity';
import { ProfessorRepository } from './professor.repository';

@Injectable()
export class ProfessorsService {
  constructor( private readonly professorRepo: ProfessorRepository ){}
  
  
  async create(createProfessorDto: CreateProfessorDto): Promise<any> | undefined {
    const email: string = createProfessorDto.email;

    const professor: Professor = await this.professorRepo.findOne({
      where: { email },
    });

    if (professor != null)
      throw new HttpException(`Professor with email ${email} already exists`, 400);

    const newProfessor = new Professor();
    
    newProfessor.name = createProfessorDto.name;
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
          name: true,
          email:true,
          photoPath: true,
          description: true,
          facomPageUrl:true
        },
    });
    return professors;
  }

  async remove(id: number): Promise<string> {
    const professor = await this.professorRepo.findOne({
      where: {id},
    });
    if (professor == null) throw new HttpException("Professor not found", 404);
    
    this.professorRepo.delete(professor);
    this.professorRepo.save(professor);
    return `Deleted Successfully`;
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} professor`;
  // }

  // update(id: number, updateProfessorDto: UpdateProfessorDto) {
  //   return `This action updates a #${id} professor`;
  // }


}
