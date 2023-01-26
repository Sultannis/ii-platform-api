import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './accessor/ideas.controller';
import { IdeasRepository } from './ideas.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaDao])],
  controllers: [IdeasController],
  providers: [IdeasService, IdeasRepository]
})
export class IdeasModule {}
