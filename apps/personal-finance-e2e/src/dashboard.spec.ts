import { expect, test } from '@playwright/test';

test.describe('Personal Finance dashboard', function () {
	test.beforeEach(async function ({ page }) {
		await page.addInitScript(function () {
			window.localStorage.clear();
		});
		await page.goto('/dashboard');
	});

	test('renders the financial summary and demo transactions', async function ({ page }) {
		await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Current balance' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Income', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Expenses' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Transactions' })).toBeVisible();
		await expect(page.locator('.transactions li')).toHaveCount(240);
		await expect(page.locator('.transactions li').first()).toContainText('Salary');
	});

	test('redirects the application root to the dashboard', async function ({ page }) {
		await page.goto('/');
		await expect(page).toHaveURL(/\/dashboard$/);
		await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
	});

	test('creates an income and persists it in local storage', async function ({ page }) {
		await page.getByRole('link', { name: 'Add income' }).click();
		await expect(page.getByRole('heading', { name: 'Add income' })).toBeVisible();
		await page.getByLabel('Description').fill('E2E salary adjustment');
		await page.getByLabel(/Amount/).fill('125.50');
		await page.getByLabel('Date').fill('2026-11-04');
		await page.getByRole('button', { name: 'Save' }).click();
		await expect(page).toHaveURL(/\/dashboard$/);
		await expect(page.getByText('E2E salary adjustment')).toBeVisible();

		const storedTransactions = await page.evaluate(function () {
			return JSON.parse(window.localStorage.getItem('personal-finance.transactions') ?? '[]') as Array<{ description: string }>;
		});
		expect(storedTransactions.some(function (transaction) {
			return transaction.description === 'E2E salary adjustment';
		})).toBe(true);
	});

	test('validates a transaction before saving', async function ({ page }) {
		await page.getByRole('link', { name: 'Add expense' }).click();
		await page.getByRole('button', { name: 'Save' }).click();
		await expect(page.getByRole('alert')).toContainText('Enter a description, a date, and an amount greater than zero.');
		await expect(page).toHaveURL(/\/add-expense$/);
	});
});
