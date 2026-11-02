import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMON } from '@workshop:common';
import { ROUTE } from '@workshop:def:consts';
import { TransactionStore } from '../../state/transaction.store';
import { TransactionType } from '@workshop:def:enums';

/** Displays the current balance and the transaction history. */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  protected readonly TransactionType = TransactionType;

  /** Provides shared transaction state to the dashboard template. */
  protected readonly store = inject(TransactionStore);

  /** Exposes the configured currency to the dashboard template. */
  protected readonly currency = COMMON.DEFAULT_CURRENCY;

  /** Exposes centralized route constants to the dashboard template. */
  protected readonly routes = ROUTE;
}
