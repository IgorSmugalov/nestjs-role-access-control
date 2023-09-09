import { Request } from 'express';
import {
  HookSubjectsSet,
  SubjectHook,
} from 'src/permissions/permissions.interface';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';
import { isNumber } from 'class-validator';
import { ValidationException } from 'src/lib/validation/validation.exception';

@Injectable()
export class UserEntityHook implements SubjectHook {
  constructor(private userService: UserService) {}
  async getSubjectData(request: Request): Promise<HookSubjectsSet> {
    const id = Number(request.params.id);
    if (!isNumber(id))
      throw new ValidationException([
        { field: 'id', value: id, error: 'Invalid user Id' },
      ]);
    const user = await this.userService.findOne({
      id,
    });
    return {
      enrichedSubject: user,
      subject: Object.assign(request.params, request.body),
    };
  }
}
