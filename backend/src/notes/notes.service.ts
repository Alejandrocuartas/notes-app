import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import ErrorMessages from 'src/utilities/utilities.errors';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createNoteDto: CreateNoteDto) {
    const note: Note = new Note();
    note.notes = createNoteDto.notes;
    note.user_id = createNoteDto.user_id;

    const user = await this.userRepository.findOne({
      where: { id: createNoteDto.user_id },
    });
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    return this.noteRepository.save(note);
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(ErrorMessages.NOTE_NOT_FOUND);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(ErrorMessages.NOTE_NOT_FOUND);
    }

    note.notes = updateNoteDto.notes;
    note.is_archived = updateNoteDto.is_archived;

    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new Error(ErrorMessages.NOTE_NOT_FOUND);
    }

    note.deleted_at = new Date();

    return this.noteRepository.save(note);
  }

  async findAllByUser(user_id: number, page: number = 1, limit: number = 10, tag_id?: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    const skip = (page - 1) * limit;
    const query = this.noteRepository.createQueryBuilder('note')
      .where('note.user_id = :user_id', { user_id })
      .skip(skip)
      .take(limit)
      .leftJoinAndSelect('note.tags', 'tag');

    if (tag_id) {
      query.andWhere('tag.id = :tag_id', { tag_id });
    }

    const [notes, total] = await query.getManyAndCount();

    const notesWithTags = await Promise.all(notes.map(async note => {
      const noteWithTags = await this.noteRepository.findOne({
        where: { id: note.id },
        relations: ['tags'],
      });
      return noteWithTags;
    }));

    const res = {
      notes: notesWithTags,
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    }

    return res;
  }
}
