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

export const ROLE_TASK_STATUSES = {
  USER: [
    TASK_STATUSES.APPROVED_TIME,
    TASK_STATUSES.WORK,
    TASK_STATUSES.APPROVING_DONE,
  ],
};

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;
  @ManyToOne(() => User)
  owner: User;

  @Column()
  projectId: number;
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

  public update(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
