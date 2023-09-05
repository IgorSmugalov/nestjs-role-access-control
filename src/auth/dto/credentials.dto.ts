import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/user';

export class CredentialsDTO extends PickType(UserEntity, ['email']) {}
