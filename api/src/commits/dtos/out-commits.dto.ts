import { Type } from "@nestjs/common";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { commit } from "../types/commit.type";

export class OutCommitDto {
    
    @IsArray()
    pages: number[];

    @IsNumber()
    lastPage: number;

    @IsArray()
    commits: commit[];

}