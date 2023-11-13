import { Module } from '@nestjs/common';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';
import { HttpModule } from '@nestjs/axios';
import { AppConfigService } from 'src/config/config.service';
import { AppService } from 'src/app.service';

@Module({
  imports: [HttpModule],
  controllers: [CommitsController],
  providers: [CommitsService, AppConfigService, AppService]
})
export class CommitsModule {}
