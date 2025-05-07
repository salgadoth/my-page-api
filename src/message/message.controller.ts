import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewMessageDTO } from './dto/register-new-message.dto';
import { MessageService } from './message.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/config/metadata';

@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Post()
  async registerMessage(@Body() registerMessageDto: RegisterNewMessageDTO) {
    return this.messageService.register(registerMessageDto);
  }
}
