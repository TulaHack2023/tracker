import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { Task } from './task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workspace)
  workspace: Workspace;

  @Column()
  name: string;

  @Column({ nullable: false, unique: true })
  tgChatId: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  constructor(task: Partial<Task>) {
    Object.assign(this, task);
  }
}
