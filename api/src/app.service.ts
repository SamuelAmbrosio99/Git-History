import { Injectable } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpService: HttpService,
  ) {}

  async authGet(url: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(url, {
      headers: this.appConfigService.authHeader,
    }));

    return response;
  }
}
