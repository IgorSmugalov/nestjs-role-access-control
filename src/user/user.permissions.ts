import { Permissions } from 'src/permissions';
import { UserIdDTO } from './dto/params.dto';
import { UserEntity } from './entities/user.entity';

export enum UserActions {
  getAll = 'getAll',
  getById = 'getById',
  update = 'update',
  delete = 'delete',
}

export const permissions: Permissions = {
  everyone(user, { can }) {
    can(UserActions.getById, UserIdDTO, { id: user.id }); // All users can read self by Id
    can(UserActions.update, UserEntity, ['id', 'name', 'email'], {
      id: user.id,
    }); // All users can update himself name by Id
  },

  admin(user, { can }) {
    // Admin can read all users
    can(UserActions.getAll, UserEntity);

    // Admin can update name, email or block/unblock any user by Id, excepts root and another admin
    can(UserActions.update, UserEntity, ['id', 'name', 'email', 'blocked'], {
      roles: { $nin: ['root', 'admin'] },
    });

    // Admin can update himself
    can(UserActions.update, UserEntity, ['id', 'name', 'email'], {
      id: user.id,
    });
  },
};
