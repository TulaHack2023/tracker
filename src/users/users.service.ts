import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.password = hash;

    return await this.entityManager.save(user);
  }

  async findByCredentials(tel: string, password: string) {
    const user = await this.userRepo.findOneBy({ tel });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }

    return null;
  }

  async findById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    user.name = updateUserDto.name;
    user.tg_name = updateUserDto.tg_name;

    await this.entityManager.save(user);
  }

  async updateTgSession(user: User, tg_session: string) {
    user.tg_session = tg_session;

    return await this.entityManager.save(user);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
  }
}
