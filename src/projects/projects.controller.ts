import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateProjectService } from './services/create-project.service';
import { UpdateProjectService } from './services/update-project.service';
import { FindProjectService } from './services/find-project.service';
import { DeleteProjectService } from './services/delete-project.service';
import { ProjectMetricsService } from './services/project-metrics.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private createProjectService: CreateProjectService,
    private updateProjectService: UpdateProjectService,
    private findProjectService: FindProjectService,
    private deleteProjectService: DeleteProjectService,
    private projectMetricsService: ProjectMetricsService,
  ) {}
  private readonly logger = new Logger(ProjectsController.name);

  @Get()
  async index() {
    return this.findProjectService.findAllProjects();
  }

  @Post()
  async create(@Body() requestBody: CreateProjectDto) {
    return this.createProjectService.createProject(requestBody);
  }

  @Get(':projectId/metrics')
  async showMetrics(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectMetricsService.getTimeMetricsByProjectId(projectId);
  }

  @Get(':projectId')
  async show(@Param('projectId', ParseIntPipe) projectId: number) {
    const project = await this.findProjectService.findByProjectId(projectId);
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  @Patch(':projectId')
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() requestBody: UpdateProjectDto,
  ) {
    const updateResult = await this.updateProjectService.updateByProjectId(
      projectId,
      requestBody,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException();
    }
    return updateResult;
  }

  @Delete(':projectId')
  async destroy(@Param('projectId', ParseIntPipe) projectId: number) {
    const deleteResult = await this.deleteProjectService.deleteByProjectId(
      projectId,
    );
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}
