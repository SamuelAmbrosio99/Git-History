import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { GetStatsDto } from './dtos/get-stats.dto';
import { stats } from './types/stats.types';

@Controller('stats')
export class StatsController {
    constructor (private readonly statsService: StatsService) {}

    @Get()
    async getStats(
        @Query() query: GetStatsDto,
    ): Promise<stats[]> {
        return this.statsService.getStats(query);
    }

}
