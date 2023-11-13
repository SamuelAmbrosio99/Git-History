import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AppConfigService } from 'src/config/config.service';
import { StatsController } from 'src/stats/stats.controller';

@Module({
  providers: [AppConfigService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StatsController);
  }
}