import { ForbiddenException, Injectable } from '@nestjs/common';
import { AnyClass, Subject } from '@casl/ability/dist/types/types';
import { PermissionsFactory } from './factories/permissions.factory';
import { AuthenticatedUserDTO } from 'src/auth';
@Injectable()
export class PermissionService {
  constructor(private permissionFactory: PermissionsFactory) {}

  /**
   * @param {AuthenticatedUserDTO} user - authenticated user from JWT
   * @param {string} action - action on subject
   * @param {(AnyClass | Subject)} subject
   * 1) always used for permitted fields check
   * 2) used for condition check if enrichedSubject not defined
   * @param {?(AnyClass | Subject)} enrichedSubject
   * Optional used only for conditions check if there is not enough data from the subject above, contains more info, used for additional checks
   * EnrichedSubject can be obtained from database with SubjectHook
   * @returns {boolean}
   * @throws {ForbiddenException}
   */
  public canAccess(
    user: AuthenticatedUserDTO,
    action: string,
    subject: AnyClass | Subject,
    enrichedSubject: AnyClass | Subject = subject,
  ): boolean {
    if (!user || !action || !subject) return false;

    const abilities = this.permissionFactory.defineAbilityForUser(user);

    // Gets list of permitted fields for action
    const permittedFieldsOfAbility =
      this.permissionFactory.definePermittedFieldForAbility(
        abilities,
        action,
        enrichedSubject,
      );

    // If permitted fields is defined - check every field
    // Uses subject keys for permissions and enrichedSubject for conditions
    if (permittedFieldsOfAbility.length > 0) {
      const subjectFields = Object.keys(subject);
      return subjectFields.every((field) =>
        abilities.can(action, enrichedSubject, field),
      );
    }

    return abilities.can(action, enrichedSubject);
  }

  public canAccessOrThrow(
    user: AuthenticatedUserDTO,
    action: string,
    subject: AnyClass | Subject,
    enrichSubject?: AnyClass | Subject,
  ) {
    if (this.canAccess(user, action, subject, enrichSubject)) return true;
    throw new ForbiddenException();
  }
}
