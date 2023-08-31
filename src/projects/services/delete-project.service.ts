import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  private readonly logger = new Logger(DeleteProjectService.name);

  deleteByProjectId(id: number) {
    return this.projectRepository
      .createQueryBuilder('project')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
