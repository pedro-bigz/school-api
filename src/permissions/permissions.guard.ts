import { Inject, CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { resourceUsage } from 'process';
import { Permission } from './permission.enum';
import { PERMISSION_KEY } from './permissions.decorator';
import { PermissionsService } from './permissions.service';
 
const PermissionsGuard = (permission: string): Type<CanActivate> => {
    class PermissionsGuardMixin implements CanActivate {
        constructor(
            private reflector: Reflector,
            // @Inject()
            private readonly permissionsService: PermissionsService
        ) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
            const { user } = context.switchToHttp().getRequest();
            const permissions = await this.permissionsService.listUserPermissions(user);
            return permissions.some((permission) => {
                console.log(permission.name, permission);
            });
        }
    }

    return mixin(PermissionsGuardMixin);
}

export default PermissionsGuard;