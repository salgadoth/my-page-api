import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, KafkaService],
})
export class MessageModule {}
