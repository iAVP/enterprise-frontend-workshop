import { Injectable, computed, inject, signal } from '@angular/core';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageFacadeService } from './storage-facade.service';

/** Provides the frontend API and business state for Personal Finance transactions. */
@Injectable({ providedIn: 'root' })
export class TransactionFacadeService {
	private readonly storageFacade = inject(StorageFacadeService);
	private readonly state = signal<Transaction[]>(this.storageFacade.getTransactions());

	/** Exposes the current transaction collection as a read-only signal. */
	readonly transactions = this.state.asReadonly();

	/** Calculates the current balance using the signed transaction type. */
	readonly balance = computed(() => this.state().reduce((sum, transaction) => sum + transaction.amount * transaction.type, 0));

	/** Calculates the total income. */
	readonly totalIncome = computed(() => this.state().filter((transaction) => transaction.type === TransactionType.income).reduce((sum, transaction) => sum + transaction.amount, 0));

	/** Calculates the total expenses. */
	readonly totalExpense = computed(() => this.state().filter((transaction) => transaction.type === TransactionType.expense).reduce((sum, transaction) => sum + transaction.amount, 0));

	/** Creates a transaction, updates the state, and delegates persistence. */
	addTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
		const createdTransaction: Transaction = {
			...transaction,
			id: crypto.randomUUID(),
		};
		const updatedTransactions = [createdTransaction, ...this.state()];

		this.state.set(updatedTransactions);
		this.storageFacade.saveTransactions(updatedTransactions);

		return createdTransaction;
	}
}
