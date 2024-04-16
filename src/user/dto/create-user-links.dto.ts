import { Prisma } from '@prisma/client';

export class CreateUserLinksDto implements Prisma.LinksCreateManyInput {
  userId: string;
  src: string;
  href: string;
}
