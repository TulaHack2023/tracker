import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace, WorkspaceToUsers } from './entities/workspace.entity';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workspace,
      WorkspaceToUsers,
      Project,
      Task,
      User,
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TrackerModule {}
