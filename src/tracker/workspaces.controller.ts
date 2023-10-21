import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkspacesService } from '../tracker/tasks.service';
import { CreateWorkspaceDto } from '../tracker/dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../tracker/dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  findOne(@Param('id') id: number) {
    return this.workspacesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
