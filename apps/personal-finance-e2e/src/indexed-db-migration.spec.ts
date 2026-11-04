import { expect, test } from '@playwright/test';

test('migrates the legacy transaction collection from localStorage to IndexedDB', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('personal-finance.transactions', JSON.stringify([{
      id: 'legacy-transaction',
      type: 1,
      description: 'Migrated legacy transaction',
      amount: 310,
      date: '2026-11-04',
    }]));
  });

  await page.goto('/login');
  await page.getByLabel('Login name').fill('demo@example.com');
  await page.getByLabel('Password').fill('StrongPassword123!');
  await page.getByRole('button', { name: 'OK' }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText('Migrated legacy transaction')).toBeVisible();

  await expect.poll(() => page.evaluate(() =>
    localStorage.getItem('personal-finance.transactions'),
  )).toBeNull();

  const migratedTransactions = await page.evaluate(async () => {
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('personal-finance', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return new Promise<Array<{ id: string; description: string }>>((resolve, reject) => {
      const request = database.transaction('key-value', 'readonly')
        .objectStore('key-value')
        .get('personal-finance.transactions');
      request.onsuccess = () => resolve(request.result ?? []);
      request.onerror = () => reject(request.error);
    });
  });

  expect(migratedTransactions).toEqual([
    expect.objectContaining({
      id: 'legacy-transaction',
      description: 'Migrated legacy transaction',
    }),
  ]);
});
