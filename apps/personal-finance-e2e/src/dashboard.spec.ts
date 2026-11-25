import { expect, test, type Page } from '@playwright/test';
import { readStoredTransactions } from './read-stored-transactions';

async function authenticate(page: Page): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Login name').fill('demo@example.com');
  await page.getByLabel('Password').fill('StrongPassword123!');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test.describe('Personal Finance dashboard', function () {
  test.beforeEach(async function ({ page }) {
    await page.addInitScript(() => {
      localStorage.clear();
      indexedDB.deleteDatabase('personal-finance');
    });
    await authenticate(page);
  });

  test('renders the financial summary and demo transactions', async function ({ page }) {
    await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current balance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Income', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Expenses' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Transactions' })).toBeVisible();
    await expect(page.locator('.transactions li')).toHaveCount(240);
    await expect(page.locator('.transactions li').first()).toContainText('Salary');
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('redirects the application root to the dashboard for an authenticated user', async function ({ page }) {
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
  });

  test('renders the configured Toolbar UI controls', async function ({ page }) {
    const toolbar = page.locator('ui-toolbar');
    await expect(toolbar).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Mark Transactions' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Income' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Expense' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Settings' })).toBeVisible();
    await expect(toolbar.getByRole('button', { name: 'Export' })).toBeVisible();
    await expect(toolbar.locator('mat-select')).toHaveCount(2);
  });

  test('opens the Notes filter dropdown and exposes its options', async function ({ page }) {
    const notesFilter = page.locator('ui-toolbar-dropdown-item').first().getByRole('combobox');
    await notesFilter.click();
    await expect(page.getByRole('option', { name: 'All Transactions' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'With Notes' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Without Notes' })).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('keeps Toolbar sections in one row on desktop', async function ({ page }) {
    await page.setViewportSize({ width: 1280, height: 900 });
    const left = page.locator('.toolbar-left');
    const center = page.locator('.toolbar-center');
    const right = page.locator('.toolbar-right');
    const boxes = await Promise.all([left.boundingBox(), center.boundingBox(), right.boundingBox()]);
    expect(boxes.every(Boolean)).toBe(true);
    expect(Math.abs(boxes[0]!.y - boxes[1]!.y)).toBeLessThan(2);
    expect(Math.abs(boxes[1]!.y - boxes[2]!.y)).toBeLessThan(2);
  });

  test('places Toolbar Center below Left and Right on tablet', async function ({ page }) {
    await page.setViewportSize({ width: 900, height: 900 });
    const left = await page.locator('.toolbar-left').boundingBox();
    const center = await page.locator('.toolbar-center').boundingBox();
    const right = await page.locator('.toolbar-right').boundingBox();
    expect(left).not.toBeNull();
    expect(center).not.toBeNull();
    expect(right).not.toBeNull();
    expect(center!.y).toBeGreaterThan(left!.y);
    expect(center!.y).toBeGreaterThan(right!.y);
  });

  test('stacks Toolbar sections vertically on mobile', async function ({ page }) {
    await page.setViewportSize({ width: 390, height: 844 });
    const left = await page.locator('.toolbar-left').boundingBox();
    const center = await page.locator('.toolbar-center').boundingBox();
    const right = await page.locator('.toolbar-right').boundingBox();
    expect(left).not.toBeNull();
    expect(center).not.toBeNull();
    expect(right).not.toBeNull();
    expect(center!.y).toBeGreaterThan(left!.y);
    expect(right!.y).toBeGreaterThan(center!.y);
  });

  test('creates an income and persists it in IndexedDB', async function ({ page }) {
    await page.getByRole('button', { name: 'Add income' }).click();
    const dialog = page.getByRole('dialog', { name: 'Add income' });
    await expect(dialog).toBeVisible();
    await dialog.getByLabel('Description').fill('E2E salary adjustment');
    await dialog.getByLabel(/Amount/).fill('125.50');
    await dialog.getByLabel('Date').fill('2026-11-04');
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('E2E salary adjustment')).toBeVisible();

    await expect.poll(async () => {
      const stored = await readStoredTransactions(page);
      return stored.some((transaction) => transaction.description === 'E2E salary adjustment');
    }).toBe(true);
  });

  test('restores saved transactions after a full page reload', async function ({ page }) {
    await page.getByRole('button', { name: 'Add income' }).click();
    const dialog = page.getByRole('dialog', { name: 'Add income' });
    await dialog.getByLabel('Description').fill('Persisted after reload');
    await dialog.getByLabel(/Amount/).fill('75');
    await dialog.getByLabel('Date').fill('2026-11-04');
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Persisted after reload')).toBeVisible();

    await page.reload();
    await expect(page.getByText('Persisted after reload')).toBeVisible();
  });


  test('validates a transaction before saving', async function ({ page }) {
    await page.getByRole('button', { name: 'Add expense' }).click();
    const dialog = page.getByRole('dialog', { name: 'Add expense' });
    await dialog.getByRole('button', { name: 'Save' }).click();
    await expect(dialog.getByRole('alert')).toContainText('Enter a description, a date, and an amount greater than zero.');
    await expect(dialog).toBeVisible();
  });
});
