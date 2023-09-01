import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { experience, projects, ...userData } = createUserDto;

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      userData.password = hashedPassword;

      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          UserExperience: {
            createMany: { data: [...experience] },
          },
          UserProjects: {
            createMany: { data: [...projects] },
          },
        },
      });

      return user;
    } catch (error) {
      throw new Error('Failed to create user and associate data.');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string) {
    return this.prismaService.user.findFirst({
      where: { username },
      include: {
        UserExperience: true,
        UserProjects: true,
      },
    });
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
