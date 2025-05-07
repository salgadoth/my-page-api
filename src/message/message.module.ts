import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { RabbitMQService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, RabbitMQService],
})
export class MessageModule {}
