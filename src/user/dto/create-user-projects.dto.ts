import { Prisma } from '@prisma/client';

export class CreateUserProjectsDto implements Prisma.ProjectsCreateManyInput {
  created_at?: string | Date;
  updated_at?: string | Date;
  userId: string;
  screenshot: string;
  name: string;
  tech: string[];
  date: Date;
  details: string;
  rating: number;
}
