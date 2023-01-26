import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './accessor/ideas.controller';
import { IdeasRepository } from './ideas.repository';

@Module({
  controllers: [IdeasController],
  providers: [IdeasService, IdeasRepository]
})
export class IdeasModule {}
