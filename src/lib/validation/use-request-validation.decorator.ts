import { ValidationError } from 'class-validator';
import { ExceptionMessage, ValidationException } from './validation.exception';
import { ValidationPipe } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory,
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      stopAtFirstError: true,
      transformOptions: { exposeUnsetFields: false },
    });
  }
}

const exceptionFactory = (err: ValidationError[]) => {
  const errorMessages = err.map((error) => {
    return new ExceptionMessage({
      error: Object.values(error.constraints).join(', '),
      field: error.property,
      value: error.value,
    });
  });
  throw new ValidationException(errorMessages);
};
