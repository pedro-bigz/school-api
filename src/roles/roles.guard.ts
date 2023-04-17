import { Role } from './roles.enum';
import { CanActivate, ExecutionContext, Inject, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
 
const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        canActivate(context: ExecutionContext) {
            const req = context.switchToHttp().getRequest();

            // console.log(req.user, role);
       
            return this.userService.userHasRole(req, role);
        }
    }
    
    return mixin(RoleGuardMixin);
}
 
export default RoleGuard;