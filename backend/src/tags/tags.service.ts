import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/notes/entities/note.entity';
import ErrorMessages from 'src/utilities/utilities.errors';

@Injectable()
export class TagsService {

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) { }

  async create(createTagDto: CreateTagDto) {
    const tag = new Tag();
    tag.tag = createTagDto.tag;
    tag.emoji = createTagDto.emoji;

    const note = await this.noteRepository.findOne({
      where: { id: createTagDto.note_id },
      relations: {
        tags: true,
      },
    });
    if (!note) {
      throw new Error(ErrorMessages.NOTE_NOT_FOUND);
    }
    const newTag = await this.tagRepository.save(tag);

    if (note.tags) {
      note.tags.push(newTag);
    } else {
      note.tags = [newTag];
    }

    await this.noteRepository.save(note);

    return newTag;
  }

  async addToNote(id: number, tag_id: number) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        tags: true,
      },
    });
    if (!note) {
      throw new Error(ErrorMessages.NOTE_NOT_FOUND);
    }

    const tag = await this.tagRepository.findOne({ where: { id: tag_id } });
    if (!tag) {
      throw new Error(ErrorMessages.TAG_NOT_FOUND);
    }

    if (note.tags) {
      note.tags.push(tag);
    } else {
      note.tags = [tag];
    }

    return await this.noteRepository.save(note);
  }

  async findAll() {
    const tags = await this.tagRepository.find();
    return tags;
  }

}
