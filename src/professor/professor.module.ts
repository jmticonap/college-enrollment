import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { ProfessorEntity } from 'src/entities/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity])],
  exports: [TypeOrmModule],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
