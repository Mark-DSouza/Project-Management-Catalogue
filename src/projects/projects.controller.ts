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
    return await this.projectsService.findAllProjects();
  }

  @Post()
  async create(@Body() requestBody: CreateProjectDto) {
    return await this.projectsService.createProject(requestBody);
  }

  @Get(':projectId')
  async show(@Param('projectId') projectId: string) {
    return await this.projectsService.findByProjectId(parseInt(projectId));
  }

  @Patch(':projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() requestBody: UpdateProjectDto,
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
