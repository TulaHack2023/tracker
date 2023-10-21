import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from './project.entity';

export enum TASK_STATUSES {
  TODO,
  APPROVING_TIME,
  APPROVED_TIME,
  WORK,
  APPROVING_DONE,
  DONE,
}
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => Project)
  project: Project;

  @Column({ default: TASK_STATUSES.TODO })
  status: TASK_STATUSES;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, unique: true })
  tgChatId: string;

  @Column('jsonb', { nullable: false, default: [] })
  messages: [];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
