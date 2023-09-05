import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UserEmail, UserId } from '../user.interface';

export class UserIdDTO extends PickType(UserEntity, ['id']) implements UserId {}

export class UserEmailDTO
  extends PickType(UserEntity, ['email'])
  implements UserEmail {}
