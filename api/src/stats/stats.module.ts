import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AppConfigService } from 'src/config/config.service';
import { HttpModule } from '@nestjs/axios';
import { AppService } from 'src/app.service';

@Module({
  imports: [HttpModule],
  controllers: [StatsController],
  providers: [StatsService, AppConfigService, AppService],
})
export class StatsModule {}
