import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Get,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import ErrorMessages from 'src/utilities/utilities.errors';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    try {
      return await this.tagsService.create(createTagDto);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.NOTE_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      return new HttpException({ message: error.message }, status);
    }
  }

  @Post(':id/notes/:note_id')
  async addToNote(@Param('id') id: string, @Param('note_id') noteId: string) {
    try {
      return await this.tagsService.addToNote(+noteId, +id);
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error.message === ErrorMessages.NOTE_NOT_FOUND || error.message === ErrorMessages.TAG_NOT_FOUND) {
        status = HttpStatus.NOT_FOUND;
      }
      return new HttpException({ message: error.message }, status);
    }
  }


  @Get()
  async findAll() {
    try {
      return await this.tagsService.findAll();
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      return new HttpException({ message: error.message }, status);
    }
  }

}

