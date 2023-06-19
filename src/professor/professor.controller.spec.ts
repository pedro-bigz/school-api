import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorController } from './professor.controller';
import { ProfessorsService } from './professor.service';

describe('ProfessorController', () => {
  let controller: ProfessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [ProfessorsService],
    }).compile();

    controller = module.get<ProfessorController>(ProfessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
