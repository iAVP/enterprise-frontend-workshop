import { Injectable, computed, effect, inject, signal } from '@angular/core';
import type { Transaction } from '@workshop:def:interfaces';
import { TransactionType } from '@workshop:def:enums';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import { StorageService } from '@workshop:dal';

const TRANSACTIONS_STORAGE_KEY = 'personal-finance.transactions';

/**
 * Coordinates transaction state and persistence for the Personal Finance feature.
 * The effect bridges an imperative storage write with the reactive in-memory state.
 */
@Injectable({ providedIn: 'root' })
export class TransactionsFacade {
  private readonly storage = inject(StorageService);
  private readonly state = signal<Transaction[]>(DEMO_TRANSACTIONS);
  private readonly reloadRequested = signal(0);

  /** Re-reads persisted data whenever a completed storage mutation requests synchronization. */
  private readonly reloadEffect = effect(() => {
    this.reloadRequested();
    this.reloadTransactions();
  });

  /** Exposes the current transaction collection as a read-only signal. */
  readonly transactions = this.state.asReadonly();

  /** Calculates the current balance from the signed transaction type. */
  readonly balance = computed(() =>
    this.state().reduce((sum, transaction) => sum + transaction.amount * transaction.type, 0),
  );

  /** Calculates total income. */
  readonly totalIncome = computed(() =>
    this.state()
      .filter((transaction) => transaction.type === TransactionType.income)
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );

  /** Calculates total expenses. */
  readonly totalExpense = computed(() =>
    this.state()
      .filter((transaction) => transaction.type === TransactionType.expense)
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );

  /**
   * Persists a new transaction and requests a fresh read.
   * If browser storage is unavailable, the current session still receives the new state.
   */
  addTransaction(item: Omit<Transaction, 'id'>): void {
    const updated = [{ ...item, id: crypto.randomUUID() }, ...this.state()];

    if (!this.storage.setItem(TRANSACTIONS_STORAGE_KEY, updated)) {
      this.state.set(updated);
      return;
    }

    this.reloadRequested.update((revision) => revision + 1);
  }

  /** Replaces in-memory state with the latest persisted collection. */
  private reloadTransactions(): void {
    this.state.set(
      this.storage.getItem<Transaction[]>(TRANSACTIONS_STORAGE_KEY) ?? DEMO_TRANSACTIONS,
    );
  }
}
