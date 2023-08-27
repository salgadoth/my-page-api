import { Prisma } from '@prisma/client';

export class CreateUserProjectsDto
  implements Prisma.UserProjectsCreateManyInput
{
  userId: string;
  // screenshot?: Buffer;
  name: string;
  languages: string;
  date: Date;
  details: string;
  rating: number;
}
