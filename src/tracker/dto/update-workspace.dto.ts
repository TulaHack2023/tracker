import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
    @IsString()
    @IsOptional()
    title?: string;

    @IsArray()
    @IsOptional()
    @Expose({ name: 'users'})
    usersIds?: number[];
}
