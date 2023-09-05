import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserInput } from '../user.interface';

export class UpdateUserDTO
  extends PartialType(
    PickType(UserEntity, ['name', 'email', 'roles', 'blocked']),
  )
  implements UpdateUserInput {}
