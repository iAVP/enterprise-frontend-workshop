import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { CONSTANTS } from '@workshop:def:consts';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import type { Transaction } from '@workshop:def:interfaces';
import { StorageService } from '@workshop:dal';
import { StorageFacadeService } from './storage-facade.service';

describe('StorageFacadeService', () => {
	let service: StorageFacadeService;
	let storageService: { getFromLocalStorage: ReturnType<typeof vi.fn>; saveToLocalStorage: ReturnType<typeof vi.fn> };

	beforeEach(function () {
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

	afterEach(function () {
		TestBed.resetTestingModule();
	});

	test('returns persisted transactions when available', function () {
		const transactions = [{ ...DEMO_TRANSACTIONS[0] }];
		storageService.getFromLocalStorage.mockReturnValue(transactions);

		expect(service.getTransactions()).toEqual(transactions);
		expect(storageService.getFromLocalStorage).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey);
	});

	test('returns a copy of demo data when no stored collection exists', function () {
		storageService.getFromLocalStorage.mockReturnValue(null);

		const transactions = service.getTransactions();

		expect(transactions).toEqual(DEMO_TRANSACTIONS);
		expect(transactions).not.toBe(DEMO_TRANSACTIONS);
	});

	test('returns demo data when persisted records do not match the transaction contract', function () {
		storageService.getFromLocalStorage.mockReturnValue([{ id: 'broken', amount: 'not-a-number' }]);

		expect(service.getTransactions()).toEqual(DEMO_TRANSACTIONS);
	});

	test('delegates transaction persistence to the data layer', function () {
		const transactions: Transaction[] = [];
		storageService.saveToLocalStorage.mockReturnValue(true);

		expect(service.saveTransactions(transactions)).toBe(true);
		expect(storageService.saveToLocalStorage).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey, transactions);
	});
});
