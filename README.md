<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p> -->
<h1 align="center">[WIP] </br>Access Control Module For NestJs </br>CASL + NestJS</h1>
PetProject

More flexible and integrated approach, than suggested by the Nest documentation:

The idea was borrowed from [nest-casl](https://github.com/getjerry/nest-casl) with some updates and improvements

- Permissions defined separately for each module
- In separate module permissions defined in one place with short and readable form
- Access must be controlled by:
  - Role
  - Condition (e.g. user is owner of resource)
  - Permitted fields of resourse (Different roles can have full or partial access to modify resource)
  - Combination of the above
- Сonfigurable Guard for every protected endpoint

# Demo

- Clone this repository
- Run:

```bash
$ npm i
$ docker-compose up -d
$ npm run start:dev
$ npx prisma generate
```

# API

[Swagger](http://localhost:3000/api)

# How use:

[WIP]

Import Permission Module into your app.

Import and configure permissions module into the module where you plan to use permission control:

```typescript
// user.module.ts
@Module({
  ...
  imports: [PermissionModule.forFeature({ permissions })],
  ...
  })
export class UserModule {}
```

Define permissions into `Permissions` object. See [How define rules in CASL](https://casl.js.org/v6/en/guide/define-rules#rules)

In current version, CASL checks the subject by `constructor.name`

```typescript
// user.permissions.ts
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
```

If you want to check the conditions in the permissions, you must extract the subject from the request, for simpler checks, data from the request can be used only, for more complete ones, you can additionally get data from the application storage.

Hook, contains data only from request

```typescript
@Injectable()
export class UserIdHook implements SubjectHook {
  async getSubjectData(request: Request): HookSubjectsSet {
    return {
      subject: request.params,
    };
  }
}
```

Hook, contains data from request and database

```typescript
@Injectable()
export class UserEntityHook implements SubjectHook {
  constructor(private userService: UserService) {}
  async getSubjectData(request: Request): Promise<HookSubjectsSet> {
    const id = Number(request.params.id);
    if (!isNumber(id)) throw new ValidationException(); // If you want to extract data from the database, then don't forget to validate them before requesting the database
    const user = await this.userService.findOne({
      id,
    });
    return {
      enrichedSubject: user,
      subject: Object.assign(request.params, request.body),
    };
  }
}
```

A little more about the `subject` and `enrichedSubject` usage:

Example: We plan to perform an `update` action on some `UserEntity`, in the `params` and `body` of the request are passed Id and data for updating the user, which we put in the `subject`, but this data is incomplete and we will need to perform additional checks. For example: we need to check that the updated user is not admin or root, but there is no information about this in the request data, so we get the data from the database and put it in the `enrichedSubject`. At the same time, we must save the `subject` separately, since we will check access to fields based on it.

Final step: Configure and use Permission Guard:

```typescript
// without condition and hook
@Get()
  @UsePermissionsGuard(UserActions.getAll, UserEntity)
  async findAll() {
    return this.userService.findAll();
  }
```

```typescript
// with conditions check and hook
 @Patch(':id')
  @UsePermissionsGuard(UserActions.update, UserEntity, UserEntityHook)
  async update(
    @Param()
    idDto: UserIdDTO,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return await this.userService.update(idDto, updateUserDto);
  }
```

# Plans:

- add checks with custom logic, based on the values, received from request and passed to the subject, when it's used with enrichedSubject

```typescript
can(Update, UserEntity, ['roles'], {
  subjectChecks: (subject) => subject.roles.includes('admin'),
});
```

- add validation into subjectHook, based on class-validator
- more informative error messages

# Requirements:

- Node
- docker

# Environments

This Compose file contains environment variables, stored in `.env`
