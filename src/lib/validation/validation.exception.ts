import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ExceptionMessage implements IExceptionMessage {
  constructor(exception: IExceptionMessage) {
    Object.assign(this, exception);
  }
  @ApiProperty()
  value: any;
  @ApiProperty()
  field: string;
  @ApiProperty()
  error: string;
}

export interface IExceptionMessage {
  field: string;
  error: string;
  value: any;
}

export class ValidationException extends BadRequestException {
  constructor(errors: ExceptionMessage[]) {
    super(errors);
  }
}
