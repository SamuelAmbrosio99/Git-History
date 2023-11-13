import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config/config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StatsModule,
    CoreModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService, AuthMiddleware],
})
export class AppModule {}
