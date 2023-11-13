import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GetCommitsDto {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly repo: string;

    @IsNumber()
    @IsNotEmpty()
    readonly page: number;

    @IsNumber()
    @IsNotEmpty()
    readonly per_page: number;
}