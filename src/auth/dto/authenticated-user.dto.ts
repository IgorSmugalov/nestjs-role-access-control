import { Role, User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { Allow } from 'class-validator';

export class AuthenticatedUserDTO implements User {
  @Expose()
  @Allow()
  id: number;

  @Expose()
  @Allow()
  email: string;

  @Expose()
  @Allow()
  name: string;

  @Expose()
  @Allow()
  blocked: boolean;

  @Expose()
  @Allow()
  roles: Role[];
}
