import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriorityGroup, ProjectLifeCycle } from './project.enums';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: PriorityGroup,
    default: PriorityGroup.Lowest,
  })
  priorityGroup: PriorityGroup;

  @Column({
    type: 'enum',
    enum: ProjectLifeCycle,
    default: ProjectLifeCycle.ToDo,
  })
  projectLifeCycle: ProjectLifeCycle;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    default: 0,
  })
  timeInToDoState: number;

  @Column({
    default: 0,
  })
  timeInPlanningState: number;

  @Column({
    default: 0,
  })
  timeInDevelopmentState: number;

  @Column({
    default: 0,
  })
  timeInActiveState: number;

  @Column({
    default: 0,
  })
  timeInInactiveState: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  activatedAt: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deactivatedAt: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
