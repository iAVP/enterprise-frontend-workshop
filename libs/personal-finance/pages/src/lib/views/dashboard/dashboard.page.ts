import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { COMMON, defaultCurrencyFormat, defaultCurrencyLocale } from '@workshop:common';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { ModalDialogService } from '@workshop:ui';
import { TransactionFormComponent } from '../transaction-form/transaction-form.page';
import { TransactionStore } from '../../state/transaction.store';

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
  protected readonly store = inject(TransactionStore);

  private readonly modalDialog = inject(ModalDialogService);

  /** Exposes the configured currency to the dashboard template. */
  protected readonly currency = COMMON.DEFAULT_CURRENCY;
  protected readonly currencyFormat = defaultCurrencyFormat;
  protected readonly currencyLocale = defaultCurrencyLocale;

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
          this.store.addTransaction(transaction);
        }
      },
    );
  }
}
