import { Prisma } from '@prisma/client';

export type CreateUserInput = Prisma.UserGetPayload<{
  select: { email: true; name: true };
}>;

export type UpdateUserInput = Partial<
  Prisma.UserGetPayload<{
    select: { email: true; name: true; roles: true; blocked: true };
  }>
>;

export type UserId = Prisma.UserGetPayload<{
  select: { id: true };
}>;

export type UserEmail = Prisma.UserGetPayload<{
  select: { email: true };
}>;
