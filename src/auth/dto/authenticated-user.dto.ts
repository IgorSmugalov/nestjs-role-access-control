import { User } from '@prisma/client';
import { UserEntity } from 'src/user';

export class AuthenticatedUserDTO extends UserEntity implements User {}
