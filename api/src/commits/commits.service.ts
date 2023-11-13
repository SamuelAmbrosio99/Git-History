import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '../config/config.service';
import { AppService } from 'src/app.service';
import { GetCommitsDto } from './dtos/get-commits.dto';
import { OutCommitDto } from './dtos/out-commits.dto';

@Injectable()
export class CommitsService {
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
        const links = response.headers.link;
        const regex = /page=(\d+)>; rel="last"/;
        const matches = links?.match(regex);
        if (!matches) {
            return 0;
        }

        return parseInt(matches[1], 10);
    }

    private buildPages(totalPages: number, page: number): number[] {
        const pages: number[] = [];
        const firstPages = [1, 2, 3];
    
        // first page
        pages.push(1);
    
        if (!firstPages.includes(+page)) {
            pages.push(+page - 1);
            pages.push(+page);
            pages.push(+page + 1);
        } else {
            firstPages.forEach((p) => {
                pages.push(+p + 1);
            });
        }
    
        // last page
        pages.push(totalPages);

        if (pages[pages.length - 1] === pages[pages.length - 2]) {
            pages.pop();
            pages.splice(1, 0, pages[1] - 1);
        }

        if (pages[pages.length - 1] === 0 || pages[pages.length - 1] > totalPages) {
            for (let i = 0; i < 2; i++) {
                pages.pop();
                pages.splice(1, 0, pages[1] - 1);
            }
        }
    
        return pages;
    }
    
    async getCommits({ user, repo, page, per_page }: GetCommitsDto): Promise<OutCommitDto> {
        const url = `${this.url}${user}/${repo}/commits?per_page=${per_page}&page=${page}`;
        const response = await this.appService.authGet(url);
        const totalPages = this.getTotal(response);
        
        return {
            pages: this.buildPages(totalPages, page),
            lastPage: totalPages,
            commits: response.data,
        };
    }
}
