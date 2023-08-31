import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectService } from './services/create-project.service';
import { UpdateProjectService } from './services/update-project.service';
import { FindProjectService } from './services/find-project.service';
import { DeleteProjectService } from './services/delete-project.service';
import { ProjectMetricsService } from './services/project-metrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    CreateProjectService,
    UpdateProjectService,
    FindProjectService,
    DeleteProjectService,
    ProjectMetricsService,
  ],
})
export class ProjectsModule {}
