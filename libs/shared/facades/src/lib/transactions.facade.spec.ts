import { TestBed } from '@angular/core/testing';
import type { Transaction } from '@workshop:def:interfaces';
import { TransactionType } from '@workshop:def:enums';
import { StorageService } from '@workshop:dal';
import { TransactionsFacade } from './transactions.facade';

describe('TransactionsFacade', () => {
  let persisted: Transaction[] | null;
  let storage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    persisted = null;
    storage = {
      getItem: vi.fn(() => persisted),
      setItem: vi.fn((_key: string, value: Transaction[]) => {
        persisted = value;
        return true;
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        TransactionsFacade,
        { provide: StorageService, useValue: storage },
      ],
    });
  });

  it('loads persisted transactions through its synchronization effect', () => {
    persisted = [{
      id: 'persisted-1',
      type: TransactionType.income,
      description: 'Persisted income',
      amount: 125,
      date: '2026-11-04',
    }];

    const facade = TestBed.inject(TransactionsFacade);
    TestBed.tick();

    expect(facade.transactions()).toEqual(persisted);
    expect(facade.totalIncome()).toBe(125);
  });

  it('persists a transaction and reloads the collection through the effect', () => {
    const facade = TestBed.inject(TransactionsFacade);
    TestBed.tick();

    facade.addTransaction({
      type: TransactionType.income,
      description: 'Consulting',
      amount: 250,
      date: '2026-11-04',
    });

    expect(storage.setItem).toHaveBeenCalledWith(
      'personal-finance.transactions',
      expect.arrayContaining([
        expect.objectContaining({ description: 'Consulting', amount: 250 }),
      ]),
    );

    TestBed.tick();

    expect(storage.getItem).toHaveBeenCalledTimes(2);
    expect(facade.transactions()).toEqual(persisted);
    expect(facade.transactions()[0].description).toBe('Consulting');
    expect(facade.totalIncome()).toBeGreaterThanOrEqual(250);
  });

  it('updates in-memory state when browser storage is unavailable', () => {
    storage.setItem.mockReturnValue(false);
    const facade = TestBed.inject(TransactionsFacade);
    TestBed.tick();

    facade.addTransaction({
      type: TransactionType.expense,
      description: 'Fallback expense',
      amount: 35,
      date: '2026-11-04',
    });

    expect(facade.transactions()[0].description).toBe('Fallback expense');
    expect(facade.totalExpense()).toBeGreaterThanOrEqual(35);
  });
});
