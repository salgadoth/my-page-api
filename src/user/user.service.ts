import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const {
        experience,
        projects,
        contacts,
        personal_links,
        languages,
        ...userData
      } = createUserDto;

      experience.map((experieces) => {
        experieces.started = new Date(experieces.started);
        if (experieces.ended) experieces.ended = new Date(experieces.ended);
        else experieces.ended = null;
      });

      projects.map((project) => {
        project.date = new Date(project.date);
      });

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      userData.password = hashedPassword;

      const user = await this.prismaService.user.create({
        data: {
          ...userData,
          my_experiences: {
            createMany: { data: [...experience] },
          },
          my_projects: {
            createMany: { data: [...projects] },
          },
          my_contacts: {
            createMany: { data: [...contacts] },
          },
          my_links: {
            createMany: { data: [...personal_links] },
          },
          my_laguages: {
            createMany: { data: [...languages] },
          },
        },
      });

      const { id, username, password, fname, lname, created_at, updated_at } =
        user;

      return { id, username, password, fname, lname, created_at, updated_at };
    } catch (error) {
      throw new Error(
        'Failed to create user and associate data, error: ' + error,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string) {
    return this.prismaService.user.findFirst({
      where: { username },
      include: {
        my_experiences: true,
        my_projects: true,
        my_contacts: true,
        my_links: true,
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
