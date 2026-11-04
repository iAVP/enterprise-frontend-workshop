import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { CONSTANTS } from '@workshop:def:consts';
import type { Transaction } from '@workshop:def:interfaces';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import { IndexedDbService, StorageService } from '@workshop:dal';
import { StorageFacadeService } from './storage-facade.service';

describe('StorageFacadeService', () => {
  let service: StorageFacadeService;
  let indexedDb: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };
  let localStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    indexedDb = { getItem: vi.fn(), setItem: vi.fn() };
    localStorage = { getItem: vi.fn(), setItem: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        StorageFacadeService,
        { provide: IndexedDbService, useValue: indexedDb },
        { provide: StorageService, useValue: localStorage },
      ],
    });
    service = TestBed.inject(StorageFacadeService);
  });

  it('returns persisted transactions from IndexedDB', async () => {
    const transactions = [{ ...DEMO_TRANSACTIONS[0] }];
    indexedDb.getItem.mockResolvedValue(transactions);

    await expect(service.getTransactions()).resolves.toEqual(transactions);
    expect(indexedDb.getItem).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey);
  });

  it('returns demo data when no transaction collection exists', async () => {
    indexedDb.getItem.mockResolvedValue(null);

    const transactions = await service.getTransactions();

    expect(transactions).toEqual(DEMO_TRANSACTIONS);
    expect(transactions).not.toBe(DEMO_TRANSACTIONS);
  });

  it('returns demo data when persisted records do not match the transaction contract', async () => {
    indexedDb.getItem.mockResolvedValue([{ id: 'broken', amount: 'not-a-number' }]);

    await expect(service.getTransactions()).resolves.toEqual(DEMO_TRANSACTIONS);
  });

  it('delegates transaction persistence to IndexedDB', async () => {
    const transactions: Transaction[] = [];
    indexedDb.setItem.mockResolvedValue(true);

    await expect(service.saveTransactions(transactions)).resolves.toBe(true);
    expect(indexedDb.setItem).toHaveBeenCalledWith(CONSTANTS.TRANSACTIONS.storageKey, transactions);
  });

  it('returns the saved login from local storage', () => {
    localStorage.getItem.mockReturnValue('remember-me@example.com');

    expect(service.getLogin()).toBe('remember-me@example.com');
    expect(localStorage.getItem).toHaveBeenCalledWith(CONSTANTS.AUTH_LOGIN.storageKey);
  });

  it('delegates login persistence to local storage', () => {
    localStorage.setItem.mockReturnValue(true);

    expect(service.saveLogin('remember-me@example.com')).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(CONSTANTS.AUTH_LOGIN.storageKey, 'remember-me@example.com');
  });
});
