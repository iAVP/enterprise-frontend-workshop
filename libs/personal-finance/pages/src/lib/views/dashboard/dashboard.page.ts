import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { AuthFacadeService, TransactionsFacade } from '@workshop:facades';
import { ModalDialogService } from '@workshop:ui';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

/** Displays the current balance and transaction history and starts transaction dialogs. */
@Component({
	selector: 'app-dashboard-page',
	standalone: true,
	imports: [CurrencyPipe, DatePipe],
	templateUrl: './dashboard.page.html',
	styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
	protected readonly TransactionType = TransactionType;

	/** Provides shared transaction state to the dashboard template. */
	protected readonly facade = inject(TransactionsFacade);

	/** Exposes the configured currency to the dashboard template. */
	protected readonly currency = COMMON.DEFAULT_CURRENCY;

	/** Exposes the configured currency format to the dashboard template. */
	protected readonly currencyFormat = COMMON.defaultCurrencyFormat;

	/** Exposes the configured currency locale to the dashboard template. */
	protected readonly currencyLocale = COMMON.defaultCurrencyLocale;

	private readonly modalDialog = inject(ModalDialogService);

	private readonly authFacade = inject(AuthFacadeService);

	private readonly router = inject(Router);

	/** Opens the generic dialog with transaction form content. */
	protected openTransactionDialog(type: TransactionType): void {
		const title = type === TransactionType.income ? 'Add income' : 'Add expense';

		this.modalDialog.open<TransactionFormComponent, { type: TransactionType }, Omit<Transaction, 'id'>>(
			TransactionFormComponent,
			{
				title,
				width: '480px',
				data: { type },
			},
			(transaction) => {
				if (transaction) {
					this.facade.addTransaction(transaction);
				}
			},
		);
	}

	/** Ends the local session and returns the user to the login page. */
	protected onLogout(): void {
		this.authFacade.logout();
		void this.router.navigateByUrl('/' + ROUTE.LOGIN);
	}
}
