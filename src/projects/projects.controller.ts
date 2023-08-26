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
import { UpsertProjectDto } from './upsert-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  private readonly logger = new Logger(ProjectsController.name);

  @Get()
  async index() {
    return await this.projectsService.findAllProjects();
  }

  @Post()
  async create(@Body() requestBody: UpsertProjectDto) {
    return await this.projectsService.createProject(requestBody);
  }

  @Get(':projectId')
  async show(@Param('projectId') projectId: string) {
    return await this.projectsService.findByProjectId(parseInt(projectId));
  }

  @Patch(':projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() requestBody: UpsertProjectDto,
  ) {
    this.logger.log(requestBody);
    return await this.projectsService.updateByProjectId(
      parseInt(projectId),
      requestBody,
    );
  }

  @Delete(':projectId')
  async destroy(@Param('projectId') projectId: string) {
    return await this.projectsService.deleteByProjectId(parseInt(projectId));
  }
}
