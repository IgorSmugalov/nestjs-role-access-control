import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export enum UserExceptionMessages {
  unknownError = 'User Unknown Error',
  userAlreadyExistst = 'User Already Existst',
  userDoesNotExistst = 'User Does Not Existst',
  emailAlreadyInUse = 'Email Already In Use',
}

export class UserUnknownErrorException extends InternalServerErrorException {
  constructor() {
    super(UserExceptionMessages.unknownError);
  }
}

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.userAlreadyExistst);
  }
}

export class EmailAlreadyInUseException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.emailAlreadyInUse);
  }
}

export class UserDoesNotExistsException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.userDoesNotExistst);
  }
}
