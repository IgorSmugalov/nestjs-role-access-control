import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database';
import { PermissionModule } from 'src/permissions';
import { permissions } from './user.permissions';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule, PermissionModule.forFeature({ permissions })],
  exports: [UserService],
})
export class UserModule {}
