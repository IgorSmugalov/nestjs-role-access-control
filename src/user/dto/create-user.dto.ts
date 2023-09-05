import { PickType } from '@nestjs/swagger';
import { CreateUserInput } from '../user.interface';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDTO
  extends PickType(UserEntity, ['email', 'name'])
  implements CreateUserInput {}
