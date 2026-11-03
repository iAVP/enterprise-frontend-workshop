import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageService } from '@workshop:dal';
import { StorageFacadeService } from './storage-facade.service';

describe('StorageFacadeService', () => {
	let service: StorageFacadeService;
	let storageService: { getFromLocalStorage: ReturnType<typeof vi.fn>; saveToLocalStorage: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		storageService = {
			getFromLocalStorage: vi.fn(),
			saveToLocalStorage: vi.fn(),
		};
		TestBed.configureTestingModule({
			providers: [
				StorageFacadeService,
				{ provide: StorageService, useValue: storageService },
			],
		});
		service = TestBed.inject(StorageFacadeService);
	});

	afterEach(() => {
		TestBed.resetTestingModule();
	});

	test('returns persisted transactions when available', () => {
		const transactions = [{ ...DEMO_TRANSACTIONS[0] }];
		storageService.getFromLocalStorage.mockReturnValue(transactions);

		expect(service.getTransactions()).toBe(transactions);
	});

	test('returns a copy of demo data when no stored collection exists', () => {
		storageService.getFromLocalStorage.mockReturnValue(null);

		const transactions = service.getTransactions();

		expect(transactions).toEqual(DEMO_TRANSACTIONS);
		expect(transactions).not.toBe(DEMO_TRANSACTIONS);
	});

	test('delegates transaction persistence to the data layer', () => {
		const transactions: Transaction[] = [];
		storageService.saveToLocalStorage.mockReturnValue(true);

		expect(service.saveTransactions(transactions)).toBe(true);
		expect(storageService.saveToLocalStorage).toHaveBeenCalledWith('personal-finance.transactions', transactions);
	});
});
