import { Injectable, computed, effect, inject, signal } from '@angular/core';
import type { Transaction } from '@workshop:def:interfaces';
import { TransactionType } from '@workshop:def:enums';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import { IndexedDbService } from '@workshop:dal';
import { CONSTANTS } from '@workshop:def:consts';

/**
 * Coordinates transaction state and IndexedDB persistence for Personal Finance.
 * The effect synchronizes the reactive collection with the external IndexedDB API.
 */
@Injectable({ providedIn: 'root' })
export class TransactionsFacade {
  private readonly storage = inject(IndexedDbService);
  private readonly state = signal<Transaction[]>(DEMO_TRANSACTIONS);
  private readonly initialized = signal(false);
  private readonly initialization = this.loadTransactions();

  /** Persists state changes after the initial IndexedDB read has completed. */
  private readonly persistenceEffect = effect(() => {
    if (!this.initialized()) {
      return;
    }

    const transactions = this.state();
    void this.storage.setItem(CONSTANTS.TRANSACTIONS.storageKey, transactions);
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

  /** Waits for initial persistence loading, then adds the transaction to the reactive collection. */
  async addTransaction(item: Omit<Transaction, 'id'>): Promise<void> {
    await this.initialization;
    this.state.update((transactions) => [{ ...item, id: crypto.randomUUID() }, ...transactions]);
  }

  private async loadTransactions(): Promise<void> {
    const stored = await this.storage.getItem<Transaction[]>(CONSTANTS.TRANSACTIONS.storageKey);
    this.state.set(stored ?? DEMO_TRANSACTIONS);
    this.initialized.set(true);
  }
}
