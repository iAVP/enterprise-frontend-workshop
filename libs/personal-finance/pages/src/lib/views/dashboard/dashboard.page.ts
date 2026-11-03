import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import { TransactionFacadeService } from '@workshop:facades';

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

	/** Exposes the configured currency to the dashboard template. */
	protected readonly currency = COMMON.DEFAULT_CURRENCY;

	/** Exposes the shared currency formatting settings to the dashboard template. */
	protected readonly currencyFormat = COMMON.defaultCurrencyFormat;
	protected readonly currencyLocale = COMMON.defaultCurrencyLocale;

	/** Exposes centralized route constants to the dashboard template. */
	protected readonly routes = ROUTE;
}
