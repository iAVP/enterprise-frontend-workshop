import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
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

  const storedTransactions = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('personal-finance.transactions') ?? '[]'),
  );
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

test('closes a dialog with Escape without persisting a transaction', async ({ page }) => {
  await page.getByRole('button', { name: 'Add expense' }).click();

  const dialog = page.getByRole('dialog', { name: 'Add expense' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');

  await expect(dialog).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('personal-finance.transactions')))
    .toBeNull();
});
