import { IsInt, IsString, MinLength } from 'class-validator';
import { Api } from 'telegram';
import { Exist } from '../../validation/exist.decorator';
import int = Api.int;

export class CodeDto {
  @IsInt()
  @Exist({ tableName: 'users', column: 'id' })
  id: int;

  @IsString()
  phoneCodeHash: string;

  @IsString()
  @MinLength(5)
  code: string;
}
