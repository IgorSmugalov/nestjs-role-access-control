import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { UserId } from '../user.interface';

export class UserIdDTO extends PickType(UserEntity, ['id']) implements UserId {}
