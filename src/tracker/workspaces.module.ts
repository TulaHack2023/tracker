import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from 'src/tracker/workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/tracker/entities/workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
   
})
export class WorkspacesModule {}
