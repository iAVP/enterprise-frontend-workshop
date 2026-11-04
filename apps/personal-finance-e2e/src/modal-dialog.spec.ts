import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    indexedDB.deleteDatabase('personal-finance');
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
});

test('creates an income through ModalDialog and restores it after reload', async ({ page }) => {
  await page.getByRole('button', { name: 'Add income' }).click();

  const dialog = page.getByRole('dialog', { name: 'Add income' });
  await expect(dialog).toBeVisible();

  await dialog.getByLabel('Description').fill('Consulting invoice');
  await dialog.getByLabel(/Amount/).fill('1250');
  await dialog.getByLabel('Date').fill('2026-11-04');
  await dialog.getByRole('button', { name: 'Save' }).click();

  await expect(dialog).toBeHidden();
  await expect(page.getByText('Consulting invoice')).toBeVisible();

  await page.reload();
  await expect(page.getByText('Consulting invoice')).toBeVisible();

  const storedTransactions = await page.evaluate(async () => {
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('personal-finance', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return new Promise<Array<{ description: string; amount: number; date: string }>>((resolve, reject) => {
      const request = database.transaction('key-value', 'readonly')
        .objectStore('key-value')
        .get('personal-finance.transactions');
      request.onsuccess = () => resolve(request.result ?? []);
      request.onerror = () => reject(request.error);
    });
  });

  expect(storedTransactions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'Consulting invoice',
        amount: 1250,
        date: '2026-11-04',
      }),
    ]),
  );
});

test('closes a dialog with Escape without adding a transaction', async ({ page }) => {
  const readStoredTransactions = () => page.evaluate(async () => {
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('personal-finance', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return new Promise<Array<{ description: string }>>((resolve, reject) => {
      const request = database.transaction('key-value', 'readonly')
        .objectStore('key-value')
        .get('personal-finance.transactions');
      request.onsuccess = () => resolve(request.result ?? []);
      request.onerror = () => reject(request.error);
    });
  });
  const initialTransactions = await readStoredTransactions();

  await page.getByRole('button', { name: 'Add expense' }).click();

  const dialog = page.getByRole('dialog', { name: 'Add expense' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');

  await expect(dialog).toBeHidden();

  const storedTransactions = await readStoredTransactions();
  expect(storedTransactions).toEqual(initialTransactions);
});
