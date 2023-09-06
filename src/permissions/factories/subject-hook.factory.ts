import { AnyClass } from '@casl/ability/dist/types/types';
import { ModuleRef } from '@nestjs/core';
import { SubjectHook } from '../permissions.interface';

export async function subjectHookFactory(
  moduleRef: ModuleRef,
  hook: AnyClass<SubjectHook>,
): Promise<SubjectHook> {
  return await moduleRef.create<SubjectHook>(hook);
}
