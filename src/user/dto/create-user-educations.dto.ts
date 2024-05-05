import { Prisma } from '@prisma/client';

export class CreateUserEducationsDto
  implements Prisma.EducationCreateManyInput
{
  userId: string;
  type: string;
  institution: string;
  subject: string;
  country: string;
  started_at: Date;
  ended_at: Date;
}
