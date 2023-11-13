import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GetStatsDto {
    @IsString()
    @IsNotEmpty()
    readonly user: string;

    @IsString()
    @IsNotEmpty()
    readonly repo: string;
}