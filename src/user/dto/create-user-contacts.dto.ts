import { Prisma } from '@prisma/client';

export class CreateUserContactsDto implements Prisma.ContactsCreateManyInput {
  userId: string;
  type: string;
  contact: string;
}
