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
    nullable: true,
  })
  planningAt?: Date;

  @Column({
    nullable: true,
  })
  developmentAt?: Date;

  @Column({
    nullable: true,
  })
  completedAt?: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
