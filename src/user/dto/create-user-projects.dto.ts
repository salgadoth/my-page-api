import { Prisma } from '@prisma/client';

export class CreateUserProjectsDto
  implements Prisma.ProjectsCreateManyInput
{
  id?: string;
  screenshot?: Buffer;
  created_at?: string | Date;
  updated_at?: string | Date;
  userId: string;
  // screenshot?: Buffer;
  name: string;
  languages: string;
  date: Date;
  details: string;
  rating: number;
}
