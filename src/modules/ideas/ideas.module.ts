import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { IdeasRepository } from './data/ideas.repository';
import { IdeasService } from './domain/ideas.service';
import { IdeasController } from './presenter/ideas.controller';
import { IdeaResource } from './presenter/resources/idea.resource';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaDao])],
  providers: [IdeasRepository, IdeasService, IdeaResource],
  controllers: [IdeasController],
})
export class IdeasModule {}
