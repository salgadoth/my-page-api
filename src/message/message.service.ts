import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterNewMessageDTO } from './dto/register-new-message.dto';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async findOne(contactDetails: string) {
    return this.prismaService.message.findFirst({
      where: { contactDetails },
    });
  }

  async register(registerNewMessage: RegisterNewMessageDTO) {
    try {
      const message = await this.findOne(registerNewMessage.contactDetails);
      if (message)
        throw new ConflictException('A message from this user already exists.');

      const registeredMessage = await this.prismaService.message.create({
        data: { ...registerNewMessage },
      });

      return registeredMessage;
    } catch (error) {
      throw new Error(
        'Failed to register message and associated data, error: ' + error,
      );
    }
  }
}
