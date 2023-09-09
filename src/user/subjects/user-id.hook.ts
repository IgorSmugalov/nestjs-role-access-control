import { Request } from 'express';
import {
  HookSubjectsSet,
  SubjectHook,
} from 'src/permissions/permissions.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserIdHook implements SubjectHook {
  async getSubjectData(request: Request): Promise<HookSubjectsSet> {
    return {
      subject: request.params,
    };
  }
}
