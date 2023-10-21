import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, USER_ROLES } from '../../users/entities/user.entity';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(
    () => WorkspaceToUsers,
    (workspaceToUsers) => workspaceToUsers.workspace,
  )
  public workspaceToUsers: WorkspaceToUsers[];
  constructor(workspace: Partial<Workspace>) {
    Object.assign(this, workspace);
  }
}

@Entity('workspace_users')
export class WorkspaceToUsers {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public workspaceId: number;

  @Column()
  public userId: number;

  @Column()
  public role: USER_ROLES;

  @ManyToOne(() => User, (user) => user.workspaceToUsers)
  public user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.workspaceToUsers)
  public workspace: Workspace;
}
