import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageFacadeService } from './storage-facade.service';
import { TransactionFacadeService } from './transaction-facade.service';

describe('TransactionFacadeService', () => {
	let service: TransactionFacadeService;
	let storageFacade: { getTransactions: ReturnType<typeof vi.fn>; saveTransactions: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		storageFacade = {
			getTransactions: vi.fn().mockReturnValue([]),
			saveTransactions: vi.fn().mockReturnValue(true),
		};
		TestBed.configureTestingModule({
			providers: [
				TransactionFacadeService,
				{ provide: StorageFacadeService, useValue: storageFacade },
			],
		});
		service = TestBed.inject(TransactionFacadeService);
		vi.stubGlobal('crypto', { randomUUID: vi.fn().mockReturnValue('generated-id') });
	});

	afterEach(() => {
		TestBed.resetTestingModule();
		vi.unstubAllGlobals();
	});

	test('initializes its state from the storage facade', () => {
		const transactions: Transaction[] = [{
			id: 'existing',
			type: TransactionType.income,
			description: 'Salary',
			amount: 100,
			date: '2026-01-01',
		}];
		TestBed.resetTestingModule();
		storageFacade.getTransactions.mockReturnValue(transactions);
		TestBed.configureTestingModule({
			providers: [
				TransactionFacadeService,
				{ provide: StorageFacadeService, useValue: storageFacade },
			],
		});
		service = TestBed.inject(TransactionFacadeService);

		expect(service.transactions()).toEqual(transactions);
	});

	test('calculates balance, income, and expenses', () => {
		service.addTransaction({
			type: TransactionType.income,
			description: 'Salary',
			amount: 100,
			date: '2026-01-01',
		});
		service.addTransaction({
			type: TransactionType.expense,
			description: 'Rent',
			amount: 35,
			date: '2026-01-02',
		});

		expect(service.totalIncome()).toBe(100);
		expect(service.totalExpense()).toBe(35);
		expect(service.balance()).toBe(65);
	});

	test('adds a transaction and persists the updated collection', () => {
		const transaction = service.addTransaction({
			type: TransactionType.income,
			description: 'Salary',
			amount: 100,
			date: '2026-01-01',
		});

		expect(transaction.id).toBe('generated-id');
		expect(service.transactions()).toEqual([transaction]);
		expect(storageFacade.saveTransactions).toHaveBeenCalledWith([transaction]);
	});
});
