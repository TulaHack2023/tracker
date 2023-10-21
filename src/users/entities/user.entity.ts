import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Workspace,
  WorkspaceToUsers,
} from '../../tracker/entities/workspace.entity';
import { Task } from '../../tracker/entities/task.entity';
import { Exclude } from 'class-transformer';

export enum USER_ROLES {
  USER,
  MANAGER,
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  tg_name: string;

  @OneToMany(
    () => WorkspaceToUsers,
    (workspaceToUsers) => workspaceToUsers.user,
  )
  public workspaceToUsers: WorkspaceToUsers[];

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  public ownWorkspaces: Workspace[];

  @ManyToMany(() => Task, (task) => task.users)
  public tasks: Task[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
