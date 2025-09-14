import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorator/roles.decorator';
import { Roles } from '../enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		const req = context.switchToHttp().getRequest();

		if (!req.user) {
			throw new ForbiddenException('User not authenticated');
		}

		if (
			requiredRoles.includes(req.user.role) ||
			(requiredRoles.includes('ID') && req.user?.id === req.params.id)
		) {
			return true;
		} else {
			throw new ForbiddenException('Forbidden user');
		}
	}
}
