import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUserDTO } from './dto/authenticated-user.dto';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUserDTO => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
