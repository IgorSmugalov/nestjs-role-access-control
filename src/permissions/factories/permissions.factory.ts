import {
  AbilityBuilder,
  ExtractSubjectType,
  Subject,
  createMongoAbility,
} from '@casl/ability';
import { AnyClass } from '@casl/ability/dist/types/types';
import * as extra from '@casl/ability/extra';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticatedUserDTO } from 'src/auth';
import { PERMISSIONS_FEATURE_OPTIONS } from '../permissions.const';
import { AppAbility, ModuleOptionsForFeature } from '../permissions.interface';

@Injectable()
export class PermissionsFactory {
  constructor(
    @Inject(PERMISSIONS_FEATURE_OPTIONS)
    private options: ModuleOptionsForFeature,
  ) {}

  defineAbilityForUser(user: AuthenticatedUserDTO) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    const { permissions } = this.options;

    if (permissions.everyone) {
      permissions.everyone(user, builder);
    }

    if (user.roles.length > 0) {
      user.roles?.forEach((role) => {
        if (typeof permissions[role] === 'function') {
          permissions[role](user, builder);
        }
      });
    }

    return builder.build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<AnyClass<Subject>>,
    });
  }

  definePermittedFieldForAbility(
    ability: AppAbility,
    action: string,
    subject: Subject,
  ) {
    return extra.permittedFieldsOf(ability, action, subject, {
      fieldsFrom: (rule) => rule.fields || [],
    });
  }
}
