import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace, WorkspaceToUsers } from './entities/workspace.entity';
import { Task } from './entities/task.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceToUsers, Project, Task]),
  ],
})
export class TrackerModule {}
