import {
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Equal } from '../../validation/equal.decorator';
import { IsUniqueConstraint } from '../../validation/is-unique';
import { User } from '../../users/entities/user.entity';
import { isUnique } from '../../validation/is-unique.decorator';

export class RegisterUserDto {
  @IsString()
  @IsPhoneNumber()
  @isUnique({ tableName: 'users', column: 'tel' })
  tel: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @Equal('password')
  password_confirmation: string;
}
