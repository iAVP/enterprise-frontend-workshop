import { Injectable, inject } from '@angular/core';
import { CONSTANTS } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageService } from '@workshop:dal';
import { DEMO_TRANSACTIONS } from '@workshop:mock';

/** Exposes business-oriented access to locally persisted transaction data. */
@Injectable({ providedIn: 'root' })
export class StorageFacadeService {
	private readonly storageService = inject(StorageService);

	/** Returns the previously saved login or an empty string. */
	getLogin(): string {
		const login = this.storageService.getFromLocalStorage<unknown>(CONSTANTS.AUTH_LOGIN.storageKey);
		return typeof login === 'string' ? login : '';
	}

	/** Persists the login name without storing authentication credentials. */
	saveLogin(login: string): boolean {
		return this.storageService.saveToLocalStorage(CONSTANTS.AUTH_LOGIN.storageKey, login);
	}

	/** Returns valid persisted transactions or the shared demonstration dataset. */
	getTransactions(): Transaction[] {
		const transactions = this.storageService.getFromLocalStorage<unknown>(CONSTANTS.TRANSACTIONS.storageKey);
		return this.isTransactionCollection(transactions) ? transactions : [...DEMO_TRANSACTIONS];
	}

	/** Persists the current transaction collection. */
	saveTransactions(transactions: Transaction[]): boolean {
		return this.storageService.saveToLocalStorage(CONSTANTS.TRANSACTIONS.storageKey, transactions);
	}

	private isTransactionCollection(value: unknown): value is Transaction[] {
		return Array.isArray(value) && value.every((transaction) => this.isTransaction(transaction));
	}

	private isTransaction(value: unknown): value is Transaction {
		if (typeof value !== 'object' || value === null) {
			return false;
		}

		const transaction = value as Partial<Transaction>;
		return typeof transaction.id === 'string'
			&& (transaction.type === TransactionType.income || transaction.type === TransactionType.expense)
			&& typeof transaction.description === 'string'
			&& transaction.description.trim().length > 0
			&& typeof transaction.amount === 'number'
			&& Number.isFinite(transaction.amount)
			&& transaction.amount > 0
			&& typeof transaction.date === 'string'
			&& transaction.date.length > 0;
	}
}
