import { TestBed } from '@angular/core/testing';
import { TransactionType } from '@workshop:def:enums';
import { DEMO_TRANSACTIONS } from '@workshop:mock';
import { StorageFacadeService } from './storage-facade.service';
import { TransactionFacadeService } from './transaction-facade.service';

describe('TransactionFacadeService', () => {
  let storageFacade: {
    getTransactions: ReturnType<typeof vi.fn>;
    saveTransactions: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    storageFacade = {
      getTransactions: vi.fn(async () => [...DEMO_TRANSACTIONS]),
      saveTransactions: vi.fn(async () => true),
    };

    TestBed.configureTestingModule({
      providers: [
        TransactionFacadeService,
        { provide: StorageFacadeService, useValue: storageFacade },
      ],
    });
  });

  it('loads transactions asynchronously from the storage facade', async () => {
    const facade = TestBed.inject(TransactionFacadeService);
    await Promise.resolve();

    expect(facade.transactions()).toEqual(DEMO_TRANSACTIONS);
  });

  it('adds a transaction and persists the updated collection', async () => {
    const facade = TestBed.inject(TransactionFacadeService);
    const created = await facade.addTransaction({
      type: TransactionType.income,
      description: 'Consulting',
      amount: 250,
      date: '2026-11-04',
    });

    expect(created.id).toBeTruthy();
    expect(facade.transactions()[0]).toEqual(created);
    expect(storageFacade.saveTransactions).toHaveBeenCalledWith(facade.transactions());
  });
});
