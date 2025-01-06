import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterNewMessageDTO } from './dto/register-new-message.dto';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class MessageService {
  constructor(
    private prismaService: PrismaService,
    private kafkaService: KafkaService,
  ) {}

  async findOne(email: string) {
    return this.prismaService.message.findFirst({
      where: { email },
    });
  }

  async register(registerNewMessage: RegisterNewMessageDTO) {
    const message = await this.findOne(registerNewMessage.email);
    if (message)
      throw new HttpException(
        'A message from this user already exists.',
        HttpStatus.CONFLICT,
      );

    const registeredMessage = await this.prismaService.message.create({
      data: { ...registerNewMessage },
    });

    if (registeredMessage) {
      this.kafkaService.sendMessage(
        'QUEUE_NEW_MESSAGE',
        JSON.stringify(registeredMessage),
      );
    }

    return registeredMessage;
  }
}