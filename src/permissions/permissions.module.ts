import { DynamicModule, Module } from '@nestjs/common';
import { PERMISSIONS_FEATURE_OPTIONS } from './permissions.const';
import { PermissionService } from './permissions.service';
import { PermissionsFactory } from './factories/permissions.factory';
import { ModuleOptionsForFeature } from './permissions.interface';

@Module({
  providers: [
    {
      provide: PERMISSIONS_FEATURE_OPTIONS,
      useValue: {},
    },
    PermissionService,
    PermissionsFactory,
  ],
  exports: [PermissionService, PermissionsFactory],
})
export class PermissionModule {
  static forFeature(options: ModuleOptionsForFeature): DynamicModule {
    return {
      module: PermissionModule,
      providers: [
        PermissionService,
        PermissionsFactory,
        {
          provide: PERMISSIONS_FEATURE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
