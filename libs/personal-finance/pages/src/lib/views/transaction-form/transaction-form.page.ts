import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import { TransactionFacadeService } from '@workshop:facades';

/** Creates an income or expense according to the active route data. */
@Component({
	selector: 'app-transaction-form-page',
	standalone: true,
	templateUrl: './transaction-form.page.html',
	styleUrl: './transaction-form.page.scss',
})
export class TransactionFormPageComponent {
	/** Provides the active route data. */
	protected readonly route = inject(ActivatedRoute);

	/** Provides navigation after saving or cancelling the form. */
	protected readonly router = inject(Router);

	/** Provides access to transaction business operations. */
	protected readonly facade = inject(TransactionFacadeService);

	/** Determines the transaction kind from route data. */
	protected readonly type = this.route.snapshot.data['type'] as TransactionType;

	/** Provides the configured display currency. */
	protected readonly currency = COMMON.DEFAULT_CURRENCY;

	/** Stores the transaction description entered by the user. */
	protected description = '';

	/** Stores the amount entered by the user before numeric conversion. */
	protected amount = '';

	/** Stores the transaction date in ISO date format. */
	protected date = new Date().toISOString().slice(0, 10);

	/** Holds validation feedback for the transaction form. */
	protected errorMessage = '';

	/** Returns the heading for the active transaction kind. */
	protected get title(): string {
		return this.type === TransactionType.income ? 'Add income' : 'Add expense';
	}

	/** Validates the form, stores the transaction, and returns to the dashboard. */
	protected onSubmit(event: SubmitEvent): void {
		event.preventDefault();

		const numericAmount = Number(this.amount);
		if (!this.description.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0 || !this.date) {
			this.errorMessage = 'Enter a description, a date, and an amount greater than zero.';
			return;
		}

		this.facade.addTransaction({
			type: this.type,
			description: this.description.trim(),
			amount: numericAmount,
			date: this.date,
		});

		this.errorMessage = '';
		void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
	}

	/** Cancels the form and returns to the dashboard without saving. */
	protected onCancel(): void {
		void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
	}
}
