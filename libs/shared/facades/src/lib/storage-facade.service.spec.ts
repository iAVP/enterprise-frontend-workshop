import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { CONSTANTS } from '@workshop:def:consts';
import type { Transaction } from '@workshop:def:interfaces';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import { StorageService } from '@workshop:dal';
import { StorageFacadeService } from './storage-facade.service';

describe('StorageFacadeService', () => {
	let service: StorageFacadeService;
	let storageService: {
		getItem: ReturnType<typeof vi.fn>;
		setItem: ReturnType<typeof vi.fn>;
	};

	beforeEach(function () {
		storageService = {
			getItem: vi.fn(),
			setItem: vi.fn(),
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
		storageService.getItem.mockReturnValue(transactions);

		expect(service.getTransactions()).toEqual(transactions);
		expect(storageService.getItem).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey);
	});

	test('returns a copy of demo data when no stored collection exists', function () {
		storageService.getItem.mockReturnValue(null);

		const transactions = service.getTransactions();

		expect(transactions).toEqual(DEMO_TRANSACTIONS);
		expect(transactions).not.toBe(DEMO_TRANSACTIONS);
	});

	test('returns demo data when persisted records do not match the transaction contract', function () {
		storageService.getItem.mockReturnValue([{ id: 'broken', amount: 'not-a-number' }]);

		expect(service.getTransactions()).toEqual(DEMO_TRANSACTIONS);
	});

	test('delegates transaction persistence to the data layer', function () {
		const transactions: Transaction[] = [];
		storageService.setItem.mockReturnValue(true);

		expect(service.saveTransactions(transactions)).toBe(true);
		expect(storageService.setItem).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey, transactions);
	});

	test('returns the saved login from the data layer', function () {
		storageService.getItem.mockReturnValue('remember-me@example.com');

		expect(service.getLogin()).toBe('remember-me@example.com');
		expect(storageService.getItem).toHaveBeenCalledWith(CONSTANTS.AUTH_LOGIN.storageKey);
	});

	test('returns an empty login when the stored value is not a string', function () {
		storageService.getItem.mockReturnValue({ login: 'invalid' });

		expect(service.getLogin()).toBe('');
	});

	test('delegates login persistence to the data layer', function () {
		storageService.setItem.mockReturnValue(true);

		expect(service.saveLogin('remember-me@example.com')).toBe(true);
		expect(storageService.setItem).toHaveBeenCalledWith(
			CONSTANTS.AUTH_LOGIN.storageKey,
			'remember-me@example.com',
		);
	});
});
