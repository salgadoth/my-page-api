import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/config/metadata';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Public()
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
    return this.userService.findOne(usernameParam);
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
