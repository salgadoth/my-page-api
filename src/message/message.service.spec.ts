import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

describe('MessageService', () => {
  let service: MessageService;
  let prismaService: PrismaService;
  let kafkaService: KafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: PrismaService,
          useValue: {
            message: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: KafkaService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    prismaService = module.get<PrismaService>(PrismaService);
    kafkaService = module.get<KafkaService>(KafkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(kafkaService).toBeDefined();
  });
});
