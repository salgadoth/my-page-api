import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { RabbitMQModule } from './rabbit/rabbit.module';
import { RabbitMQService } from './rabbit/rabbit.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    MessageModule,
    RabbitMQModule,
  ],
  controllers: [],
  providers: [RabbitMQService],
})
export class AppModule {}
