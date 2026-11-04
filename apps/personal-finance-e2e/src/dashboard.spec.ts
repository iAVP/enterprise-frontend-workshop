import { expect, test, type Page } from '@playwright/test';

async function authenticate(page: Page): Promise<void> {
	await page.goto('/login');
	await page.getByLabel('Login name').fill('demo@example.com');
	await page.getByLabel('Password').fill('StrongPassword123!');
	await page.getByRole('button', { name: 'OK' }).click();
	await expect(page).toHaveURL(/\/dashboard$/);
}

test.describe('Personal Finance dashboard', function () {
	test.beforeEach(async function ({ page }) {
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

	test('creates an income and persists it in local storage', async function ({ page }) {
		await page.getByRole('button', { name: 'Add income' }).click();
		const dialog = page.getByRole('dialog', { name: 'Add income' });
		await expect(dialog).toBeVisible();
		await dialog.getByLabel('Description').fill('E2E salary adjustment');
		await dialog.getByLabel(/Amount/).fill('125.50');
		await dialog.getByLabel('Date').fill('2026-11-04');
		await dialog.getByRole('button', { name: 'Save' }).click();
		await expect(dialog).toBeHidden();
		await expect(page.getByText('E2E salary adjustment')).toBeVisible();

		const storedTransactions = await page.evaluate(function () {
			return JSON.parse(window.localStorage.getItem('personal-finance.transactions') ?? '[]') as Array<{ description: string }>;
		});
		expect(storedTransactions.some(function (transaction) {
			return transaction.description === 'E2E salary adjustment';
		})).toBe(true);
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
