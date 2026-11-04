import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from '@workshop:facades';

/** Protects application routes and redirects unauthenticated users to login. */
export const authGuard: CanActivateFn = () => {
	const authFacade = inject(AuthFacadeService);
	const router = inject(Router);

	return authFacade.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
