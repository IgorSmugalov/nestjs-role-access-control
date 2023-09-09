import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { PERMISSIONS_GUARD_CONFIG } from './permissions.const';
import { AccessForbiddenException } from './permissions.exceptions';
import { PermissionGuardOptions, SubjectHook } from './permissions.interface';
import { PermissionService } from './permissions.service';
import { subjectHookFactory } from './factories/subject-hook.factory';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private accessService: PermissionService,
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { action, subjectClass, subjectHook } =
      this.reflector.get<PermissionGuardOptions>(
        PERMISSIONS_GUARD_CONFIG,
        context.getHandler(),
      );
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;

    // request.user === null or user.roles empty - throw error
    if (!user || user.roles.length === 0) throw new AccessForbiddenException();

    // root has unrestricted access
    if (user.roles.includes('root')) return true;

    let canActivate = false;

    // subjectHook uses for permissions with conditions checks
    if (subjectHook) {
      const factory = await subjectHookFactory(this.moduleRef, subjectHook);
      let { subject, enrichedSubject } = await factory.getSubjectData(request);

      // subject from request, contains data from request only (from body, params, query or it's combination)
      subject = this.buildSubjectInstance(subjectClass, subject);

      // same subject, but getted from database and contains additional data
      enrichedSubject = this.buildSubjectInstance(
        subjectClass,
        enrichedSubject,
      );

      canActivate = this.accessService.canAccess(
        user,
        action,
        subject,
        enrichedSubject,
      );
    } else {
      // subjectHook not used and specific subject instance not defined, conditions cheks not supported
      canActivate = this.accessService.canAccess(user, action, subjectClass);
    }
    if (canActivate) return true;
    throw new AccessForbiddenException();
  }

  private buildSubjectInstance(subjectClass: AnyClass, object: AnyObject) {
    return plainToInstance(subjectClass, object, { exposeUnsetFields: false });
  }
}

export function UsePermissionsGuard(
  action: string,
  subjectClass: AnyClass,
  subjectHook?: AnyClass<SubjectHook>,
) {
  return applyDecorators(
    SetMetadata<string, PermissionGuardOptions>(PERMISSIONS_GUARD_CONFIG, {
      action,
      subjectClass,
      subjectHook,
    }),
    UseGuards(PermissionsGuard),
  );
}
