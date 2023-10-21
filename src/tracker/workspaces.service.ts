import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from '../tracker/dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../tracker/dto/update-workspace.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { Workspace, WorkspaceToUsers } from './entities/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace) 
    private workspaceRepository: Repository<Workspace>, 
    ) {}
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const workspace = new Workspace({
      relations: ['owner'],
    });

    // workspace.owner.id = AuthOwner.id;
    // workspace.task.
    // workspace.workspaceToUsers.Users = AuthOwner;
    return workspace;
  }

  async findOneById(id: number) : Promise<Workspace>{
    const workspace = await this.workspaceRepository.findOne(id);
  
    if (!workspace) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  
    return workspace;
  }

  /*
  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceRepository.save(
      {
        id: workspace,
      })
  }
  */
  async remove(id: number) {
    return this.workspaceRepository.remove(Workspace[id])
  }
}
