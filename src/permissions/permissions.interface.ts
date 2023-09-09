import { AbilityBuilder, MongoAbility } from '@casl/ability';
import { AnyClass } from '@casl/ability/dist/types/types';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { AuthenticatedUserDTO } from 'src/auth';

/**
 * root role excluded because it's can do any action, see permissions guard
 * everyone used for adding permissions regardless of role
 */
export type Roles = Exclude<Role, 'root'> | 'everyone';

export type AppAbility = MongoAbility;

export type DefinePermissionsForRole = (
  user: AuthenticatedUserDTO,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type Permissions = Partial<Record<Roles, DefinePermissionsForRole>>;

export interface ModuleOptionsForFeature {
  permissions: Permissions;
}

export interface PermissionGuardOptions {
  action: string;
  subjectClass: AnyClass;
  subjectHook: AnyClass<SubjectHook>;
}

export interface HookSubjectsSet {
  subject: Record<string, any>;
  enrichedSubject?: Record<string, any>;
}

export interface SubjectHook {
  getSubjectData(request: Request): Promise<HookSubjectsSet> | HookSubjectsSet;
}
