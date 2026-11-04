import { Injectable, computed, signal } from '@angular/core';
import type { Transaction } from '@workshop:def:interfaces';
import { TransactionType } from '@workshop:def:enums';
import { DEMO_TRANSACTIONS } from '@workshop:mock';

/** Owns the Personal Finance transaction collection and its derived totals. */
@Injectable({ providedIn: 'root' })
export class TransactionStore {
  /** Holds the writable transaction state internally. */
  private readonly state = signal<Transaction[]>(this.loadTransactions());

  /** Exposes the current transaction collection as a read-only signal. */
  readonly transactions = this.state.asReadonly();

  /** Calculates the current balance using the signed transaction type. */
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

  /** Adds a transaction, persists it, and refreshes state from the storage layer. */
  addTransaction(item: Omit<Transaction, 'id'>): void {
    const updated = [{ ...item, id: crypto.randomUUID() }, ...this.state()];

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('personal-finance.transactions', JSON.stringify(updated));
        this.reloadTransactions();
        return;
      }
    } catch {
      // Keep the current session usable when browser storage is unavailable.
    }

    this.state.set(updated);
  }

  /** Re-reads persisted transactions and updates the signal consumed by the UI. */
  reloadTransactions(): void {
    this.state.set(this.loadTransactions());
  }

  /** Loads persisted transactions or the dedicated demo dataset. */
  private loadTransactions(): Transaction[] {
    if (typeof localStorage === 'undefined') {
      return DEMO_TRANSACTIONS;
    }

    try {
      const saved = localStorage.getItem('personal-finance.transactions');
      if (saved === null) {
        return DEMO_TRANSACTIONS;
      }

      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as Transaction[]) : DEMO_TRANSACTIONS;
    } catch {
      return DEMO_TRANSACTIONS;
    }
  }
}
