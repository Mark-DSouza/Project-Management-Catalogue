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
    default: true,
  })
  active: boolean;

  @Column({
    type: 'bigint',
    default: 0,
  })
  timeInToDoState: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  timeInPlanningState: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  timeInDevelopmentState: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  timeInActiveState: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  timeInInactiveState: number;

  @Column({
    nullable: true,
  })
  activatedAt: Date;

  @Column({
    nullable: true,
  })
  deactivatedAt: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
