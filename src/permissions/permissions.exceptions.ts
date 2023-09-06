import { ForbiddenException } from '@nestjs/common';

enum PermissionExceptions {
  forbiddenDefaultMessage = 'Access denied',
}

export class AccessForbiddenException extends ForbiddenException {
  constructor() {
    super(PermissionExceptions.forbiddenDefaultMessage);
  }
}
