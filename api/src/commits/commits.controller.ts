import { Controller, Get, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { GetCommitsDto } from './dtos/get-commits.dto';
import { commit } from './types/commit.type';
import { OutCommitDto } from './dtos/out-commits.dto';

@Controller('commits')
export class CommitsController {
    constructor(private readonly commitsService: CommitsService) {}

    @Get()
    async getCommits(
        @Query() query: GetCommitsDto,
    ): Promise<OutCommitDto> {
        return this.commitsService.getCommits(query);
    }
}
