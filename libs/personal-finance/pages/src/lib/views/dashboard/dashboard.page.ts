import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import { AuthFacadeService, TransactionFacadeService } from '@workshop:facades';

/** Displays the current balance and the transaction history. */
@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	imports: [CurrencyPipe, DatePipe, RouterLink],
	templateUrl: './dashboard.page.html',
	styleUrl: './dashboard.page.scss',
})
export class DashboardPageComponent {
	protected readonly TransactionType = TransactionType;

	/** Provides the transaction state and business operations to the dashboard. */
	protected readonly facade = inject(TransactionFacadeService);

	/** Exposes shared application configuration to the dashboard template. */
	protected readonly common = COMMON;

	/** Exposes centralized route constants to the dashboard template. */
	protected readonly routes = ROUTE;

	/** Provides navigation after ending the local session. */
	private readonly router = inject(Router);

	/** Manages the local demonstration authentication session. */
	private readonly authFacade = inject(AuthFacadeService);

	/** Ends the local session and returns to the login page. */
	protected onLogout(): void {
		this.authFacade.logout();
		void this.router.navigateByUrl('/' + ROUTE.LOGIN);
	}
}
