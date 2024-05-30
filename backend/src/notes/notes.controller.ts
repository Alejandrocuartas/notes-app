import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import ErrorMessages from 'src/utilities/utilities.errors';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    try {
      return await this.notesService.create(createNoteDto);
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.notesService.findOne(+id);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.NOTE_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      throw new HttpException({ message: error.message }, status);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      return await this.notesService.update(+id, updateNoteDto);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.NOTE_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      throw new HttpException({ message: error.message }, status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.notesService.remove(+id);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.NOTE_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      throw new HttpException({ message: error.message }, status);
    }
  }

  @Get('users/:id')
  async findAllByUser(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('tag_id') tagId: number,
    @Query('archived') archived: string = 'false',
  ) {
    try {

      let archivedParam = false;
      if (archived.toLowerCase() === 'true') {
        archivedParam = true;
      } else if (archived.toLowerCase() === 'false') {
        archivedParam = false;
      }


      return await this.notesService.findAllByUser(+id, +page, +limit, +tagId, archivedParam);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.USER_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      throw new HttpException({ message: error.message }, status);
    }
  }
}
