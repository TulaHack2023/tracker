import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    ownerId: number;
}
