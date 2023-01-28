import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './accessor/ideas.controller';
import { IdeasRepository } from './ideas.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { UsersModule } from '../users/users.module';
import { IdeaResource } from './accessor/resources/idea.resource';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaDao]), UsersModule],
  controllers: [IdeasController],
  providers: [IdeasService, IdeasRepository, IdeaResource],
})
export class IdeasModule {}
