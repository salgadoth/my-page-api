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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/config/metadata';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Get(':username')
  async findOne(@Param('username') usernameParam: string) {
    const user = await this.userService.findOne(usernameParam);

    if (user === null)
      return new HttpException(
        'User not found, check provided username.',
        HttpStatus.BAD_REQUEST,
      );

    const {
      username,
      title,
      fname,
      lname,
      created_at,
      updated_at,
      city,
      country,
      state,
      my_experiences,
      my_projects,
      my_contacts,
    } = user;

    return {
      username,
      title,
      fname,
      lname,
      city,
      state,
      country,
      created_at,
      updated_at,
      my_experiences,
      my_projects,
      my_contacts,
    };
  }

  @Patch(':id') //TODO
  update(@Param('id') id: string) {
    return this.userService.update(id);
  }

  @Delete(':id') //TODO
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
