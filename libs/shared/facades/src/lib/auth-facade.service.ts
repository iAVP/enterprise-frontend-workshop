import { Injectable, signal } from '@angular/core';

/** Manages the local demonstration authentication session. */
@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
	private static readonly SESSION_KEY = 'personal-finance.authenticated';
	private readonly state = signal(sessionStorage.getItem(AuthFacadeService.SESSION_KEY) === 'true');

	/** Exposes whether the current browser session is authenticated. */
	readonly isAuthenticated = this.state.asReadonly();

	/** Starts the local demonstration session after successful form validation. */
	login(): void {
		sessionStorage.setItem(AuthFacadeService.SESSION_KEY, 'true');
		this.state.set(true);
	}

	/** Ends the local demonstration session. */
	logout(): void {
		sessionStorage.removeItem(AuthFacadeService.SESSION_KEY);
		this.state.set(false);
	}
}
