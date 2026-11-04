import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Provides asynchronous key-value persistence backed by IndexedDB.
 * Existing localStorage values are migrated lazily when a key is first read.
 */
@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private readonly document = inject(DOCUMENT);
  private database: Promise<IDBDatabase> | null = null;

  /** Reads and deserializes a value from IndexedDB, migrating a legacy localStorage value if needed. */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const database = await this.openDatabase();
      const storedValue = await this.request<T | undefined>(
        database.transaction('key-value', 'readonly').objectStore('key-value').get(key),
      );

      if (storedValue !== undefined) {
        return storedValue;
      }

      const legacyStorage = this.document.defaultView?.localStorage;
      const serialized = legacyStorage?.getItem(key);
      if (serialized === null || serialized === undefined) {
        return null;
      }

      const legacyValue = JSON.parse(serialized) as T;
      if (await this.setItem(key, legacyValue)) {
        legacyStorage?.removeItem(key);
      }
      return legacyValue;
    } catch {
      return null;
    }
  }

  /** Stores a value in IndexedDB. Returns false when the database is unavailable or the write fails. */
  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const database = await this.openDatabase();
      const transaction = database.transaction('key-value', 'readwrite');
      transaction.objectStore('key-value').put(value, key);
      await this.complete(transaction);
      return true;
    } catch {
      return false;
    }
  }

  /** Removes a value from IndexedDB. */
  async removeItem(key: string): Promise<boolean> {
    try {
      const database = await this.openDatabase();
      const transaction = database.transaction('key-value', 'readwrite');
      transaction.objectStore('key-value').delete(key);
      await this.complete(transaction);
      return true;
    } catch {
      return false;
    }
  }

  private openDatabase(): Promise<IDBDatabase> {
    if (this.database) {
      return this.database;
    }

    const indexedDB = this.document.defaultView?.indexedDB;
    if (!indexedDB) {
      return Promise.reject(new Error('IndexedDB is not available in this environment.'));
    }

    this.database = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('personal-finance', 1);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains('key-value')) {
          database.createObjectStore('key-value');
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('Unable to open IndexedDB.'));
      request.onblocked = () => reject(new Error('The IndexedDB upgrade is blocked.'));
    }).catch((error: unknown) => {
      this.database = null;
      throw error;
    });

    return this.database;
  }

  private request<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed.'));
    });
  }

  private complete(transaction: IDBTransaction): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed.'));
      transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction was aborted.'));
    });
  }
}
