import { Injectable, inject } from '@angular/core';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageService } from '@workshop:dal';

/** Exposes business-oriented access to locally persisted transaction data. */
@Injectable({ providedIn: 'root' })
export class StorageFacadeService {
	private readonly storageService = inject(StorageService);

	private readonly transactionsKey = 'personal-finance.transactions';

	/** Returns persisted transactions or the shared demonstration dataset. */
	getTransactions(): Transaction[] {
		const transactions = this.storageService.getFromLocalStorage<Transaction[]>(this.transactionsKey);
		return Array.isArray(transactions) ? transactions : [...DEMO_TRANSACTIONS];
	}

	/** Persists the current transaction collection. */
	saveTransactions(transactions: Transaction[]): boolean {
		return this.storageService.saveToLocalStorage(this.transactionsKey, transactions);
	}
}
