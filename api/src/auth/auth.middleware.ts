import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: AppConfigService) {}

  private readonly ghToken = this.configService.ghToken;

  use(req: any, res: any, next: () => void) {
    req.headers['Authorization'] = `Bearer ${this.ghToken}`;
    next();
  }
}
