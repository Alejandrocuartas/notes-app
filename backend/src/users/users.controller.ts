import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import ErrorMessages from '../utilities/utilities.errors';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      if (error.message === ErrorMessages.USERNAME_ALREADY_EXISTS) {
        throw new HttpException(
          { message: ErrorMessages.USERNAME_ALREADY_EXISTS },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.login(loginUserDto);
      return user;
    } catch (error) {
      if (error.message === ErrorMessages.INVALID_PASSWORD) {
        throw new HttpException(
          { message: ErrorMessages.INVALID_PASSWORD },
          HttpStatus.UNAUTHORIZED,
        );
      } else if (error.message === ErrorMessages.USER_NOT_FOUND) {
        throw new HttpException(
          { message: ErrorMessages.USER_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
