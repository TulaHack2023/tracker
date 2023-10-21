import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    ) {}
  async create(createProjectDto: CreateProjectDto) {
    const project = new Project({});

    project.Workspace.id = createProjectDto.workspaceId;
    project.name = createProjectDto.name;

    const res = await this.entityManager.save(project)
    return res;
  }

  async findAll(projectId: number) {
    return await this.projectRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.projectRepository.findOneByOrFail({ id })
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneByOrFail({ id });

    return await this.entityManager.save(project);
  }

  remove(id: number) {
    this.projectRepository.delete(id);
  }
}
