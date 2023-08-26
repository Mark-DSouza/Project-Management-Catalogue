import { PriorityGroup, ProjectLifeCycle } from './project.enums';

export class UpsertProjectDto {
  title: string;
  description: string;
  priorityGroup: PriorityGroup;
  ProjectLifeCycle: ProjectLifeCycle;
}
