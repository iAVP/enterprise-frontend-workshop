import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import type { TransactionType } from '../../models/transaction.model';
import { TransactionStore } from '../../state/transaction.store';

/** Creates an income or expense according to the active route data. */
@Component({
  selector: 'app-transaction-form-page',
  standalone: true,
  templateUrl: './transaction-form.page.html',
  styleUrl: './transaction-form.page.scss',
})
export class TransactionFormPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(TransactionStore);

  /** Determines the transaction kind from route data. */
  readonly type = this.route.snapshot.data['type'] as TransactionType;

  /** Provides the configured display currency. */
  readonly currency = COMMON.DEFAULT_CURRENCY;

  /** Stores the transaction description entered by the user. */
  description = '';

  /** Stores the amount entered by the user before numeric conversion. */
  amount = '';

  /** Stores the transaction date in ISO date format. */
  date = new Date().toISOString().slice(0, 10);

  /** Holds validation feedback for the transaction form. */
  errorMessage = '';

  /** Returns the heading for the active transaction kind. */
  get title(): string {
    return this.type === 'income' ? 'Add income' : 'Add expense';
  }

  /** Validates the form, stores the transaction, and returns to the dashboard. */
  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const numericAmount = Number(this.amount);
    if (
      !this.description.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !this.date
    ) {
      this.errorMessage = 'Enter a description, a date, and an amount greater than zero.';
      return;
    }

    this.store.addTransaction({
      type: this.type,
      description: this.description.trim(),
      amount: numericAmount,
      date: this.date,
    });

    this.errorMessage = '';
    void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
  }

  /** Cancels the form and returns to the dashboard without saving. */
  onCancel(): void {
    void this.router.navigateByUrl('/' + ROUTE.DASHBOARD);
  }
}
