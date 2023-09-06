import { AnyClass } from '@casl/ability/dist/types/types';
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
import {
  AppActions,
  PermissionGuardOptions,
  SubjectHook,
} from './permissions.interface';
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

    if (!user || user.roles.length === 0) throw new AccessForbiddenException();
    if (user.roles.includes('root')) return true;

    const factory = await subjectHookFactory(this.moduleRef, subjectHook);

    const subjectInstance = plainToInstance(
      subjectClass,
      await factory.getSubjectData(request),
    );

    if (this.accessService.canAccess(user, action, subjectInstance))
      return true;
    throw new AccessForbiddenException();
  }
}

export function UsePermissionsGuard(
  action: AppActions,
  subjectClass: AnyClass,
  subjectHook: AnyClass<SubjectHook>,
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
