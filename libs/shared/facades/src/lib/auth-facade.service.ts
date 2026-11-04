import { Injectable, inject, signal } from '@angular/core';
import { StorageFacadeService } from './storage-facade.service';

/** Manages the local demonstration authentication session. */
@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
	private readonly storageFacade = inject(StorageFacadeService);
	private static readonly SESSION_KEY = 'personal-finance.authenticated';
	private readonly state = signal(sessionStorage.getItem(AuthFacadeService.SESSION_KEY) === 'true');

	/** Exposes whether the current browser session is authenticated. */
	readonly isAuthenticated = this.state.asReadonly();

	/** Returns the login name saved for the next visit to the login form. */
	getSavedLogin(): string {
		return this.storageFacade.getLogin();
	}

	/** Starts the local demonstration session and saves only the login name. */
	login(login: string): void {
		this.storageFacade.saveLogin(login);
		sessionStorage.setItem(AuthFacadeService.SESSION_KEY, 'true');
		this.state.set(true);
	}

	/** Ends the local demonstration session. */
	logout(): void {
		sessionStorage.removeItem(AuthFacadeService.SESSION_KEY);
		this.state.set(false);
	}
}
