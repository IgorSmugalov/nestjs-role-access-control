import { AbilityBuilder, Subject, MongoAbility } from '@casl/ability';
import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { AuthenticatedUserDTO } from 'src/auth';

export enum AppActions {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

/**
 * root role excluded because it's can do any action, see permissions guard
 * everyone for adding permissions regardless of role
 */
export type Roles = Exclude<Role, 'root'> | 'everyone';

export type AppAbility = MongoAbility<[AppActions, Subject]>;

export type DefinePermissionsForUserRole = (
  user: AuthenticatedUserDTO,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type Permissions = Partial<Record<Roles, DefinePermissionsForUserRole>>;

export interface ModuleOptionsForFeature {
  permissions: Permissions;
}

export interface PermissionGuardOptions {
  action: AppActions;
  subjectClass: AnyClass;
  subjectHook: AnyClass<SubjectHook>;
}

export interface SubjectHook {
  getSubjectData(request: Request): Promise<AnyObject>;
}
