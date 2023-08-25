import { PriorityGroup, ProjectLifeCycle } from './project.enums';

export class CreateProjectDto {
  title: string;
  description: string;
  priorityGroup: PriorityGroup;
  ProjectLifeCycle: ProjectLifeCycle;
}
