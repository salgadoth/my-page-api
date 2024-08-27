import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'notification-producer',
      brokers: [process.env.KAFKA_SERVER],
    });
  }
  onModuleInit() {
    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }
}
