import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service'; // Import your PrismaService
import { UserService } from './user.service'; // Import your UserService
import { CreateUserDto } from './dto/create-user.dto'; // Import your CreateUserDto

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
            userExperience: {
              createMany: jest.fn(),
            },
            userProjects: {
              createMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user with hashed password', async () => {
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      password: 'testpassword',
      fname: 'Test',
      lname: 'User',
      experience: [],
      projects: [],
    };

    const mockHashedPassword = 'hashed_password';

    // Mock bcrypt.hash
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword);

    // Mock PrismaService methods
    const createdUser = { id: 1, ...createUserDto };
    prismaService.user.create.mockResolvedValue(createdUser);

    const result = await userService.create(createUserDto);

    expect(result).toEqual(createdUser);
    expect(prismaService.user.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: mockHashedPassword,
    });
    expect(prismaService.userExperience.createMany).toHaveBeenCalledWith({
      data: [],
    });
    expect(prismaService.userProjects.createMany).toHaveBeenCalledWith({
      data: [],
    });
  });

  it('should throw an error if user creation fails', async () => {
    const createUserDto: CreateUserDto = {
      // ...
    };

    prismaService.user.create.mockRejectedValue(new Error('Database error'));

    await expect(userService.create(createUserDto)).rejects.toThrow(
      'Failed to create user and associate data.',
    );
  });
});
