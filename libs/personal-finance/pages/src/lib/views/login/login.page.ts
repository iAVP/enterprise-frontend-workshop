import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
import type { LoginCredentials } from '@workshop:def:interfaces';
import { AuthFacadeService } from '@workshop:facades';
import { LoginComponent } from '../../components/login/login.component';

/** Hosts the login component and handles the demonstration navigation flow. */
@Component({
	selector: 'app-login-page',
	standalone: true,
	imports: [LoginComponent],
	templateUrl: './login.page.html',
	styleUrl: './login.page.scss',
})
export class LoginPageComponent {
	/** Provides router navigation for the login flow. */
	protected readonly router = inject(Router);

	/** Manages the local demonstration authentication session. */
	private readonly authFacade = inject(AuthFacadeService);

	/** Starts the local session and navigates to the dashboard after form validation succeeds. */
	protected onLoginRequested(credentials: LoginCredentials): void {
		this.authFacade.login(credentials.email);
		void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
	}
}
