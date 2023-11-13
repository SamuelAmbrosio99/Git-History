import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '../config/config.service';
import { firstValueFrom } from 'rxjs';
import { GetStatsDto } from './dtos/get-stats.dto';
import { GetResultsDto } from './dtos/results.dto';
import { stats, statsType } from './types/stats.types';
import { AppService } from 'src/app.service';

@Injectable()
export class StatsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: AppConfigService,
        private readonly appService: AppService
    ) {}
    private readonly url = this.configService.ghUrl;

    private getTotal(response: any): number {
        if (!response) {
            return 0;
        }
        const links = response.headers.link
        const regex = /page=(\d+)>; rel="last"/;
        const matches = links?.match(regex);
        if (!matches) {
            return 1;
        }

        return parseInt(matches[1], 10);
    }

    private async getResults({user, repo, type}: GetResultsDto): Promise<stats> {
        const url = (state: string) => `${this.url}${user}/${repo}/${type}?state=${state}&per_page=1&page=1`;

        const totalResponse = await this.appService.authGet(url('all'));
        const total = this.getTotal(totalResponse);

        const openBranches = await this.appService.authGet(url('open'));
        const open = this.getTotal(openBranches);

        const closedBranches = await this.appService.authGet(url('closed'));
        const closed = this.getTotal(closedBranches);

        return {
            title: statsType[type],
            qty: total,
            results: [
                {
                    title: 'Open',
                    qty: open,
                    progress: ((open / total) * 100).toFixed(2),
                },
                {
                    title: 'Closed',
                    qty: closed,
                    progress: ((closed / total) * 100).toFixed(2),
                },
            ],
        }
    }

    private async getBranchesResults({user, repo}: GetStatsDto): Promise<stats> {
        const url = (bProtected: boolean | undefined) => `${this.url}${user}/${repo}/branches?per_page=1&page=1${bProtected ? '&protected=' + bProtected : ''}`;

        const totalResponse = await this.appService.authGet(url(undefined));
        const total = this.getTotal(totalResponse);

        const openBranches = await this.appService.authGet(url(false));
        const open = this.getTotal(openBranches);

        const protectedBranches = await this.appService.authGet(url(true));
        const protectedResult = this.getTotal(protectedBranches);

        return {
            title: statsType.branches,
            qty: total + protectedResult,
            results: [
                {
                    title: 'Open',
                    qty: open,
                    progress: ((open / total + protectedResult) * 100).toFixed(2),
                },
                {
                    title: 'Protected',
                    qty: protectedResult,
                    progress: ((protectedResult / total + protectedResult) * 100).toFixed(2),
                },
            ],
        }
    }

    async getStats({user, repo}: GetStatsDto): Promise<any> {
        const pullsResult = await this.getResults({user, repo, type: 'pulls'});
        const issuesResult = await this.getResults({user, repo, type: 'issues'});
        const branchesResult = await this.getBranchesResults({user, repo});
        const result = [pullsResult, issuesResult, branchesResult];

        return result;
    }

}
