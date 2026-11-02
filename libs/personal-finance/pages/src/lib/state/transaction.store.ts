import { Injectable, computed, signal } from '@angular/core';
import type { Transaction } from '@workshop:def:interfaces';
import { DEMO_TRANSACTIONS } from '@workshop:mock';

const STORAGE_KEY = 'personal-finance.transactions';

/** Owns the Personal Finance transaction collection and its derived totals. */
@Injectable({ providedIn: 'root' })
export class TransactionStore {
  /** Holds the writable transaction state internally. */
  private readonly state = signal<Transaction[]>(this.loadTransactions());

  /** Exposes the current transaction collection as a read-only signal. */
  readonly transactions = this.state.asReadonly();

  /** Calculates the current balance. */
  readonly balance = computed(() =>
    this.state().reduce((sum, transaction) =>
      sum + (transaction.type === 'income' ? transaction.amount : -transaction.amount), 0),
  );

  /** Calculates total income. */
  readonly totalIncome = computed(() =>
    this.state()
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );

  /** Calculates total expenses. */
  readonly totalExpense = computed(() =>
    this.state()
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );

  /** Adds a transaction and persists the updated collection. */
  addTransaction(item: Omit<Transaction, 'id'>): void {
    this.saveTransactions([{ ...item, id: crypto.randomUUID() }, ...this.state()]);
  }

  /** Loads persisted transactions or the dedicated demo dataset. */
  private loadTransactions(): Transaction[] {
    if (typeof localStorage === 'undefined') {
      return DEMO_TRANSACTIONS;
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) {
        return DEMO_TRANSACTIONS;
      }

      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as Transaction[]) : DEMO_TRANSACTIONS;
    } catch {
      return DEMO_TRANSACTIONS;
    }
  }

  /** Updates in-memory state and persists it when browser storage is available. */
  private saveTransactions(items: Transaction[]): void {
    this.state.set(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The current session remains usable without browser storage.
    }
  }
}
