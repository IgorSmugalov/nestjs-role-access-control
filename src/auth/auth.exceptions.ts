import { UnauthorizedException } from '@nestjs/common';

export enum AuthExceptionMessages {
  unauthorizedDefaultMessage = 'User not authenticated',
}

export class UserUnauthorizedException extends UnauthorizedException {
  constructor() {
    super(AuthExceptionMessages.unauthorizedDefaultMessage);
  }
}
