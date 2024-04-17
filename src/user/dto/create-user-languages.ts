import { Prisma } from '@prisma/client';

export class CreateUserLanguagesDto implements Prisma.LanguagesCreateManyInput {
  userId: string;
  language: string;
  fluency_level: string;
}
