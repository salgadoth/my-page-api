import { Prisma } from '@prisma/client';

export class CreateUserExperienceDto
  implements Prisma.UserExperienceCreateManyInput
{
  userId: string;
  title: string;
  company: string;
  step: string;
  country: string;
  desc: string;
  started: Date;
  ended: Date;
}
