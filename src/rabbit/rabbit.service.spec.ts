import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbit.service';
import * as amqp from 'amqplib';

jest.mock('amqplib');

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  let mockConnection: { createChannel: jest.Mock; close: jest.Mock };
  let mockChannel: {
    assertQueue: jest.Mock;
    sendToQueue: jest.Mock;
    close: jest.Mock;
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    mockConnection = {
      createChannel: jest.fn(),
      close: jest.fn(),
    };

    mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
      close: jest.fn(),
    };

    (amqp.connect as jest.Mock).mockResolvedValue(mockConnection);
    mockConnection.createChannel.mockResolvedValue(mockChannel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMQService],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('connect', () => {
    it('should connect to the RabbitMQ server', async () => {
      await service.connect();

      expect(amqp.connect).toHaveBeenCalledWith(service['address']);
      expect(mockConnection.createChannel).toHaveBeenCalled();
      expect(service['connection']).toBe(mockConnection);
      expect(service['channel']).toBe(mockChannel);
    });
  });

  describe('sendMessage', () => {
    it('should send a message to the queue', async () => {
      const queue = 'test-queue';
      const message = 'test-message';

      await service.sendMessage(queue, message);

      expect(mockChannel.assertQueue).toHaveBeenCalledWith(queue, {
        durable: true,
      });
      expect(mockChannel.sendToQueue).toHaveBeenCalledWith(
        queue,
        Buffer.from(message),
        { persistent: true },
      );
    });
  });

  describe('close', () => {
    it('should close the channel and connection', async () => {
      await service.close();

      expect(mockChannel.close).toHaveBeenCalled();
      expect(mockConnection.close).toHaveBeenCalled();
    });
  });

  describe('onModuleDestroy', () => {
    it('should close the channel and connection', async () => {
      const closeSpy = jest.spyOn(service, 'close');

      await service.onModuleDestroy();

      expect(mockChannel.close).toHaveBeenCalled();
      expect(mockConnection.close).toHaveBeenCalled();
      expect(closeSpy).toHaveBeenCalled();
    });
  });
});
