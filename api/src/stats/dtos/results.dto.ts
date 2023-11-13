import { IsNotEmpty, IsString } from "class-validator";
import { GetStatsDto } from "./get-stats.dto";

export class GetResultsDto extends GetStatsDto {
    @IsString()
    @IsNotEmpty()
    readonly type: string;
}