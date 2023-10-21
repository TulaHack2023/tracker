import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EntityManager, In, Repository } from 'typeorm';
import {
  ROLE_TASK_STATUSES,
  Task,
  TASK_STATUSES,
} from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,

    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private entityManager: EntityManager,
  ) {}

  // Стейт машина на entity невозможна из-за потери DI
  private taskStatusHandlers = {
    [TASK_STATUSES.TODO]: (task: Task) => this.statusChanged(task),
    [TASK_STATUSES.APPROVING_TIME]: (task: Task) => this.statusChanged(task),
    [TASK_STATUSES.APPROVED_TIME]: (task: Task) => this.statusChanged(task),
    [TASK_STATUSES.WORK]: (task: Task) => this.statusChanged(task),
    [TASK_STATUSES.APPROVING_DONE]: (task: Task) => this.statusChanged(task),
    [TASK_STATUSES.DONE]: (task: Task) => this.statusChanged(task),
  };

  statusChanged(task: Task) {
    // TODO telegram integration
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task({});

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.projectId = createTaskDto.projectId;

    const users = await this.usersRepo.findBy({
      id: In(createTaskDto.usersIds),
    });

    task.users = users;
    task.status = TASK_STATUSES.TODO;
    // TODO: implement user
    task.ownerId = 1;

    // TODO: telegram chat creation
    task.tgChatId = '123';

    const res = await this.entityManager.save(task);
    return res;
  }

  async findAllByWorkspace(workspaceId: number) {
    return await this.tasksRepo.find({
      where: {
        project: {
          workspace: {
            id: workspaceId,
          },
        },
      },
      relations: ['owner'],
    });
  }

  async findAllByProject(projectId: number) {
    return await this.tasksRepo.find({
      where: {
        projectId: projectId,
      },
      relations: ['owner'],
    });
  }

  async findOne(id: number) {
    return await this.tasksRepo.findOneByOrFail({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const authedUser = await this.usersRepo.findOneByOrFail({ id: 1 });

    const task = await this.tasksRepo.findOneByOrFail({ id });

    let users = task.users;
    if (updateTaskDto.usersIds) {
      users = await this.usersRepo.findBy({
        id: In(updateTaskDto.usersIds),
      });
    }

    task.update({
      ...updateTaskDto,
      users,
      status: task.status,
    });

    if (
      !!updateTaskDto.status &&
      ROLE_TASK_STATUSES.USER.includes(updateTaskDto.status)
    ) {
      // CHECK if user may change status
      task.status = updateTaskDto.status;
      this.taskStatusHandlers[task.status](task);
    }

    return await this.entityManager.save(task);
  }

  remove(id: number) {
    this.usersRepo.delete(id);
  }
}
