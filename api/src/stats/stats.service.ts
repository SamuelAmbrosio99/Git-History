import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '../config/config.service';
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

    private async getTotalCount(url: string): Promise<number> {
        const response = await this.appService.authGet(url);
        return this.getTotal(response);
    }

    private getTotal(response: any): number {
        if (!response) {
            return 0;
        }
        const links = response.headers.link;
        const regex = /page=(\d+)>; rel="last"/;
        const matches = links?.match(regex);
        if (!matches) {
            return 1;
        }

        return parseInt(matches[1], 10);
    }

    private calculateProgress(value: number, total: number): string {
        return ((value / total) * 100).toFixed(2);
    }

    private async getResults({ user, repo, type }: GetResultsDto): Promise<stats> {
        const url = (state: string) => `${this.url}${user}/${repo}/${type}?state=${state}&per_page=1&page=1`;

        const total = await this.getTotalCount(url('all'));
        const open = await this.getTotalCount(url('open'));
        const closed = await this.getTotalCount(url('closed'));

        return {
            title: statsType[type],
            qty: total,
            results: [
                {
                    title: 'Open',
                    qty: open,
                    progress: this.calculateProgress(open, total),
                },
                {
                    title: 'Closed',
                    qty: closed,
                    progress: this.calculateProgress(closed, total),
                },
            ],
        };
    }

    private async getBranchesResults({ user, repo }: GetStatsDto): Promise<stats> {
        const url = (bProtected: boolean | undefined) =>
            `${this.url}${user}/${repo}/branches?per_page=1&page=1${bProtected ? '&protected=' + bProtected : ''}`;

        const total = await this.getTotalCount(url(undefined));
        const open = await this.getTotalCount(url(false));
        const protectedResult = await this.getTotalCount(url(true));

        return {
            title: statsType.branches,
            qty: total + protectedResult,
            results: [
                {
                    title: 'Open',
                    qty: open,
                    progress: this.calculateProgress(open, total + protectedResult),
                },
                {
                    title: 'Protected',
                    qty: protectedResult,
                    progress: this.calculateProgress(protectedResult, total + protectedResult),
                },
            ],
        };
    }

    async getStats({ user, repo }: GetStatsDto): Promise<any> {
        const [pullsResult, issuesResult, branchesResult] = await Promise.all([
            this.getResults({ user, repo, type: 'pulls' }),
            this.getResults({ user, repo, type: 'issues' }),
            this.getBranchesResults({ user, repo }),
        ]);

        return [pullsResult, issuesResult, branchesResult];
    }
}
