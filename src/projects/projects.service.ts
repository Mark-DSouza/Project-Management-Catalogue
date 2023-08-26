import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  private readonly logger = new Logger(ProjectsService.name);

  private getProjectBaseQuery() {
    return this.projectRepository
      .createQueryBuilder('project')
      .orderBy('project.id');
  }

  createProject(requestBody: CreateProjectDto) {
    return this.projectRepository.save(requestBody);
  }

  findAllProjects() {
    return this.getProjectBaseQuery().getMany();
  }

  findByProjectId(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  deleteByProjectId(id: number) {
    return this.projectRepository
      .createQueryBuilder('project')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
