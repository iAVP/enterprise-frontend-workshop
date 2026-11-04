import type { Page } from '@playwright/test';

export async function readStoredTransactions(page: Page): Promise<Array<{ description: string }>> {
  return page.evaluate(async () => {
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('personal-finance', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return new Promise<Array<{ description: string }>>((resolve, reject) => {
      const request = database.transaction('key-value', 'readonly')
        .objectStore('key-value')
        .get('personal-finance.transactions');
      request.onsuccess = () => resolve((request.result as Array<{ description: string }>) ?? []);
      request.onerror = () => reject(request.error);
    });
  });
}
