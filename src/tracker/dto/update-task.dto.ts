import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TASK_STATUSES } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @Expose({ name: 'users' })
  usersIds?: number[];

  @IsInt()
  @IsOptional()
  @IsEnum(TASK_STATUSES, { each: true })
  status?: TASK_STATUSES;
}
