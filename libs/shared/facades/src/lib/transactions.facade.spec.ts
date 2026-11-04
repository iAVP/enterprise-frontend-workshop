import { TestBed } from '@angular/core/testing';
import type { Transaction } from '@workshop:def:interfaces';
import { TransactionType } from '@workshop:def:enums';
import { IndexedDbService } from '@workshop:dal';
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
      getItem: vi.fn(async () => persisted),
      setItem: vi.fn(async (_key: string, value: Transaction[]) => {
        persisted = value;
        return true;
      }),
    };

    TestBed.configureTestingModule({
      providers: [
        TransactionsFacade,
        { provide: IndexedDbService, useValue: storage },
      ],
    });
  });

  it('loads persisted transactions from IndexedDB', async () => {
    persisted = [{
      id: 'persisted-1',
      type: TransactionType.income,
      description: 'Persisted income',
      amount: 125,
      date: '2026-11-04',
    }];

    const facade = TestBed.inject(TransactionsFacade);
    await Promise.resolve();

    expect(facade.transactions()).toEqual(persisted);
    expect(facade.totalIncome()).toBe(125);
  });

  it('adds a transaction after initial loading and persists the collection', async () => {
    const facade = TestBed.inject(TransactionsFacade);
    await facade.addTransaction({
      type: TransactionType.income,
      description: 'Consulting',
      amount: 250,
      date: '2026-11-04',
    });

    TestBed.tick();

    expect(facade.transactions()[0].description).toBe('Consulting');
    expect(storage.setItem).toHaveBeenCalledWith(
      'personal-finance.transactions',
      expect.arrayContaining([
        expect.objectContaining({ description: 'Consulting', amount: 250 }),
      ]),
    );
  });

  it('uses demo data when IndexedDB has no transaction collection', async () => {
    const facade = TestBed.inject(TransactionsFacade);
    await Promise.resolve();

    expect(facade.transactions().length).toBeGreaterThan(0);
  });
});
