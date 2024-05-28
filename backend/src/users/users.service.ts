import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  hashPassword,
  comparePassword,
} from '../utilities/utilities.encryption';
import ErrorMessages from 'src/utilities/utilities.errors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new Error(ErrorMessages.USERNAME_ALREADY_EXISTS);
    }
    console.log(existingUser);

    const user: User = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;

    const hashedPassword = await hashPassword(createUserDto.password);
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }
    const isPasswordValid = await comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error(ErrorMessages.INVALID_PASSWORD);
    }
    return user;
  }
}
