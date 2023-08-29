import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  private readonly logger = new Logger(ProjectsController.name);

  @Get()
  async index() {
    return this.projectsService.findAllProjects();
  }

  @Post()
  async create(@Body() requestBody: CreateProjectDto) {
    return this.projectsService.createProject(requestBody);
  }

  @Get(':projectId/metrics')
  async showMetrics(@Param('projectId') projectId: string) {
    return this.projectsService.getTimeMetricsByProjectId(parseInt(projectId));
  }

  @Get(':projectId')
  async show(@Param('projectId') projectId: string) {
    return this.projectsService.findByProjectId(parseInt(projectId));
  }

  @Patch(':projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() requestBody: UpdateProjectDto,
  ) {
    this.logger.log(requestBody);
    return this.projectsService.updateByProjectId(
      parseInt(projectId),
      requestBody,
    );
  }

  @Delete(':projectId')
  async destroy(@Param('projectId') projectId: string) {
    return this.projectsService.deleteByProjectId(parseInt(projectId));
  }
}
