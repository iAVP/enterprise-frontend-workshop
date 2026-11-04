import '@angular/compiler';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let values: Map<string, string>;
  let storage: StorageService;

  beforeEach(() => {
    values = new Map<string, string>();
    const localStorageMock = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
      removeItem: (key: string) => {
        values.delete(key);
      },
    };

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: DOCUMENT, useValue: { defaultView: { localStorage: localStorageMock } } },
      ],
    });

    storage = TestBed.inject(StorageService);
  });

  it('serializes and deserializes values', () => {
    const value = [{ id: '1', amount: 42 }];

    expect(storage.setItem('transactions', value)).toBe(true);
    expect(storage.getItem('transactions')).toEqual(value);
  });

  it('returns null when a key does not exist', () => {
    expect(storage.getItem('missing')).toBeNull();
  });

  it('returns null when stored JSON is invalid', () => {
    values.set('invalid', '{not-json');

    expect(storage.getItem('invalid')).toBeNull();
  });

  it('removes a stored value', () => {
    storage.setItem('transactions', [1, 2, 3]);

    expect(storage.removeItem('transactions')).toBe(true);
    expect(storage.getItem('transactions')).toBeNull();
  });
});
