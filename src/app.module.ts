import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, MessageModule, KafkaModule],
  controllers: [],
  providers: [KafkaService],
})
export class AppModule {}
