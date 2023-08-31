import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { ProjectLifeCycle } from '../project.enums';

@Injectable()
export class UpdateProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  private readonly logger = new Logger(UpdateProjectService.name);

  updateByProjectId(id: number, requestBody: UpdateProjectDto) {
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
