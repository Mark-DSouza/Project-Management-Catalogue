import { UpdateProjectDto } from './dtos/update-project.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectLifeCycle } from './project.enums';

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

  async updateByProjectId(id: number, requestBody: UpdateProjectDto) {
    const updateValue = { ...new Project(), ...requestBody };

    const presentTime = new Date();
    switch (requestBody.projectLifeCycle) {
      case ProjectLifeCycle.Planning: {
        updateValue.planningAt = presentTime;
        break;
      }
      case ProjectLifeCycle.Development: {
        updateValue.developmentAt = presentTime;
        break;
      }
      case ProjectLifeCycle.Complete: {
        updateValue.completedAt = presentTime;
        break;
      }
      default: {
        break;
      }
    }

    return this.projectRepository
      .createQueryBuilder('project')
      .update()
      .set(updateValue)
      .where('id = :id', { id })
      .execute();
  }
}
