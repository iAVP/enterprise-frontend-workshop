import { expect, test } from '@playwright/test';

test('opens the Personal Finance dashboard', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add income' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add expense' })).toBeVisible();
});
