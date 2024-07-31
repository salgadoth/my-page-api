import { Body, Controller, Post } from '@nestjs/common';
import { RegisterNewMessageDTO } from './dto/register-new-message.dto';

@Controller('message')
export class MessageController {
  @Post()
  async registerMessage(@Body() registerMessageDto: RegisterNewMessageDTO) {
    return (
      'Message from: ' + registerMessageDto.name + ' registered successfully.'
    );
  }
}
