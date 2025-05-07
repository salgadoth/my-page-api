import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly address = process.env.AMQP_URL || 'amqp://localhost';

  async connect() {
    this.connection = await amqp.connect(this.address);
    this.channel = await this.connection.createChannel();
  }

  async sendMessage(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
