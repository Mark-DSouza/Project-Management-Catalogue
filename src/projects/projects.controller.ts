import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  private readonly logger = new Logger(ProjectsController.name);

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':projectId')
  async findByProjectId(@Param('projectId') projectId: string) {
    return await this.projectsService.findByProjectId(parseInt(projectId));
  }

  @Post()
  async create(@Body() requestBody: CreateProjectDto) {
    return await this.projectsService.create(requestBody);
  }

  @Delete(':projectId')
  async delete(@Param('projectId') projectId: string) {
    return await this.projectsService.destroy(parseInt(projectId));
  }
}
