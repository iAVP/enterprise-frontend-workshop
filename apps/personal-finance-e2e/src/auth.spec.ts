import { expect, test } from '@playwright/test';

test.describe('Authentication form', function () {
	test.beforeEach(async function ({ page }) {
		await page.addInitScript(function () {
			window.localStorage.clear();
		});
		await page.goto('/login');
	});

	test('shows required field validation when submitted empty', async function ({ page }) {
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page.getByRole('alert')).toHaveCount(2);
		await expect(page.getByText('Login name is required.')).toBeVisible();
		await expect(page.getByText('Password is required.')).toBeVisible();
	});

	test('rejects an invalid email and a weak password', async function ({ page }) {
		await page.getByLabel('Login name').fill('not-an-email');
		await page.getByLabel('Password').fill('short');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page.getByText('Enter a valid email address.')).toBeVisible();
		await expect(page.getByText('Password must contain at least 12 characters, uppercase and lowercase letters, a number, and a special character.')).toBeVisible();
		await expect(page).toHaveURL(/\/login$/);
	});

	test('accepts locally valid credentials and navigates to the dashboard', async function ({ page }) {
		await page.getByLabel('Login name').fill('demo@example.com');
		await page.getByLabel('Password').fill('StrongPassword123!');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page).toHaveURL(/\/dashboard$/);
		await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();
	});

	test('clears entered values and validation feedback when cancelled', async function ({ page }) {
		const email = page.getByLabel('Login name');
		const password = page.getByLabel('Password');
		await email.fill('invalid');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page.getByText('Enter a valid email address.')).toBeVisible();
		await page.getByRole('button', { name: 'Cancel' }).click();
		await expect(email).toHaveValue('');
		await expect(password).toHaveValue('');
		await expect(page.getByRole('alert')).toHaveCount(0);
	});
});
