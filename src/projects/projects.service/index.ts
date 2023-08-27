import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectLifeCycle } from '../project.enums';
import { TimeHelper } from './time-helper';
import { MetricsGenerator } from './metrics-generator';

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

  async getTimeMetricsByProjectId(id: number) {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .select([
        'project.createdDate',
        'project.planningAt',
        'project.developmentAt',
        'project.completedAt',
      ])
      .where('project.id = :id', { id })
      .getOne();
    this.logger.log(JSON.stringify(project));
    const createdAtTimestamp = project.createdDate.getTime();
    const planningAtTimestamp: number | undefined =
      project.planningAt?.getTime();
    const developmentAtTimestamp: number | undefined =
      project.developmentAt?.getTime();
    const completedAtTimestamp: number | undefined =
      project.completedAt?.getTime();

    const presentTimestamp = Date.now();
    const currentLifeCycle = project.projectLifeCycle;
    const { ToDo, Planning, Development, Complete } = ProjectLifeCycle;

    const millisecondsSinceStarted = (() => {
      return presentTimestamp - createdAtTimestamp;
    })();

    const millisecondsInToDo = (() => {
      if (currentLifeCycle === ToDo) {
        return millisecondsSinceStarted;
      }
      return planningAtTimestamp - createdAtTimestamp;
    })();

    const millisecondsInPlanning = (() => {
      if (currentLifeCycle < Planning) {
        return 0;
      } else if (currentLifeCycle === Planning) {
        return presentTimestamp - planningAtTimestamp;
      } else {
        return developmentAtTimestamp - planningAtTimestamp;
      }
    })();

    const millisecondsInDevelopment = (() => {
      if (currentLifeCycle < Development) {
        return 0;
      } else if (currentLifeCycle === Development) {
        return presentTimestamp - developmentAtTimestamp;
      } else {
        return completedAtTimestamp - developmentAtTimestamp;
      }
    })();

    const millisecondsSinceCompleted = (() => {
      if (currentLifeCycle < Complete) {
        return 0;
      }
      return presentTimestamp - completedAtTimestamp;
    })();

    const {
      millisecondsToSeconds,
      millisecondsToMinutes,
      millisecondsToHours,
      millisecondsToDays,
      millisecondsToWeeks,
    } = TimeHelper;

    const metricGenerator = new MetricsGenerator(
      millisecondsSinceStarted,
      millisecondsInToDo,
      millisecondsInPlanning,
      millisecondsInDevelopment,
      millisecondsSinceCompleted,
    );

    return {
      milliseconds: metricGenerator.generateMetrics(
        (milliseconds) => milliseconds,
      ),
      seconds: metricGenerator.generateMetrics(millisecondsToSeconds),
      minutes: metricGenerator.generateMetrics(millisecondsToMinutes),
      hours: metricGenerator.generateMetrics(millisecondsToHours),
      days: metricGenerator.generateMetrics(millisecondsToDays),
      weeks: metricGenerator.generateMetrics(millisecondsToWeeks),
    };
  }

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
