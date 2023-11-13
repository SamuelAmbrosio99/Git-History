import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor (private readonly configService: ConfigService) {}

    get ghUrl(): string {
        return this.configService.get<string>('GH_API');
    }

    get ghToken(): string {
        return this.configService.get<string>('GH_TOKEN');
    }

    get authHeader(): { Authorization: string } {
        return {
            Authorization: `Bearer ${this.ghToken}`,
        }
    }
}
