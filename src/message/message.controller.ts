import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewMessageDTO } from './dto/register-new-message.dto';
import { Public } from 'src/config/metadata';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Post()
  async registerMessage(@Body() registerMessageDto: RegisterNewMessageDTO) {
    return this.messageService.register(registerMessageDto);
  }
}
