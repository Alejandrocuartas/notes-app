import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Note } from 'src/notes/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Note])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule { }
