import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { ProjectLifeCycle } from '../project.enums';
import { metricsGenerator } from '../helpers/generate-metrics';
import {
  millisecondsToDays,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  millisecondsToWeeks,
} from '../helpers/time-helper';

Injectable();
export class ProjectMetricsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  private readonly logger = new Logger(ProjectMetricsService.name);

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

    const generateMetrics = metricsGenerator({
      millisecondsSinceStarted,
      millisecondsInToDo,
      millisecondsInPlanning,
      millisecondsInDevelopment,
      millisecondsSinceCompleted,
    });

    return {
      milliseconds: generateMetrics((milliseconds) => milliseconds),
      seconds: generateMetrics(millisecondsToSeconds),
      minutes: generateMetrics(millisecondsToMinutes),
      hours: generateMetrics(millisecondsToHours),
      days: generateMetrics(millisecondsToDays),
      weeks: generateMetrics(millisecondsToWeeks),
    };
  }
}
