import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Experiences } from '@prisma/client';

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
        education,
        ...userData
      } = createUserDto;

      education.map((ed) => {
        ed.started_at = new Date(ed.started_at);
        if (ed.ended_at) ed.ended_at = new Date(ed.ended_at);
        else ed.ended_at = null;
      });

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
          my_languages: {
            createMany: { data: [...languages] },
          },
          my_education: {
            createMany: { data: [...education] },
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

  async findOne(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
      include: {
        my_experiences: true,
        my_projects: true,
        my_contacts: true,
        my_links: true,
        my_languages: true,
        my_education: true,
      },
    });

    if (user === null)
      return new HttpException(
        'User not found, check provided username.',
        HttpStatus.BAD_REQUEST,
      );

    const {
      title,
      fname,
      lname,
      created_at,
      updated_at,
      city,
      country,
      state,
      skill_set,
      my_experiences,
      my_projects,
      my_contacts,
      my_links,
      my_languages,
      my_education,
    } = user;

    const curr_company = findCurrentOcupation(my_experiences);

    return {
      username,
      title,
      fname,
      lname,
      city,
      state,
      country,
      curr_company,
      created_at,
      updated_at,
      skill_set,
      my_experiences,
      my_projects,
      my_contacts,
      my_links,
      my_languages,
      my_education,
    };
  }

  async findCredentials(username: string) {
    const user = await this.prismaService.user.findFirst({
      where: { username },
    });

    return { password: user.password, id: user.id };
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

function findCurrentOcupation(experiences: Experiences[]) {
  const current = experiences.find((exp) => exp.ended === null);
  return current;
}
