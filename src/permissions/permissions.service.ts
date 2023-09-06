import { Injectable } from '@nestjs/common';
import { ForbiddenError } from '@casl/ability';
import { AppActions } from './permissions.interface';
import { AnyClass } from '@casl/ability/dist/types/types';
import { AuthenticatedUserDTO } from 'src/auth';
import { PermissionsFactory } from './factories/permissions.factory';

@Injectable()
export class PermissionService {
  constructor(private abilityFactory: PermissionsFactory) {}

  public canAccess(
    user: AuthenticatedUserDTO,
    action: AppActions,
    subject: AnyClass,
  ): boolean {
    if (!user || !action || !subject) return false;
    const abilities = this.abilityFactory.defineAbilityForUser(user);
    const permittedFieldsOfAbility =
      this.abilityFactory.definePermittedFieldForAbility(
        abilities,
        action,
        subject,
      );
    if (permittedFieldsOfAbility.length > 0) {
      const subjectFields = Object.keys(subject);
      subjectFields.forEach((field) => {
        try {
          ForbiddenError.from(abilities).throwUnlessCan(action, subject, field);
        } catch {
          return false;
        }
      });
    }
    return abilities.can(action, subject);
  }
}
