import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { GetStatsDto } from './dtos/get-stats.dto';

@Controller('stats')
export class StatsController {
    constructor (private readonly statsService: StatsService) {}

    @Get()
    async getStats(
        @Query() query: GetStatsDto,
    ): Promise<any> {
        return this.statsService.getStats(query);
    }

}
