import { IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Exist } from '../../validation/exist.decorator';

export class LoginUserDto {
  @IsString()
  @IsPhoneNumber()
  @Exist({ tableName: 'users', column: 'tel' })
  tel: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
