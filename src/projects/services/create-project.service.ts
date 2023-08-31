import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';

@Injectable()
export class CreateProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  private readonly logger = new Logger(CreateProjectService.name);

  createProject(requestBody: CreateProjectDto) {
    return this.projectRepository.save(requestBody);
  }
}
