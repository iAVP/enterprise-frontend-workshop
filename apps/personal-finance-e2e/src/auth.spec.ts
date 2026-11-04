import { expect, test } from '@playwright/test';

test.describe('Authentication form', function () {
	test.beforeEach(async function ({ page }) {
		await page.goto('/login');
	});

	test('redirects unauthenticated users from the dashboard to login', async function ({ page }) {
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/login$/);
	});

	test('redirects unauthenticated users from the application root to login', async function ({ page }) {
		await page.goto('/');
		await expect(page).toHaveURL(/\/login$/);
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

	test('accepts locally valid credentials, saves only the login, and keeps the session after reload', async function ({ page }) {
		await page.getByLabel('Login name').fill('demo@example.com');
		await page.getByLabel('Password').fill('StrongPassword123!');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page).toHaveURL(/\/dashboard$/);
		await expect(page.getByRole('heading', { name: 'Personal Finance' })).toBeVisible();

		const storedLogin = await page.evaluate(function () {
			return window.localStorage.getItem('personal-finance.login');
		});
		expect(storedLogin).toBe('"demo@example.com"');
		const storedValues = await page.evaluate(function () {
			return Object.values(window.localStorage).join(' ');
		});
		expect(storedValues).not.toContain('StrongPassword123!');

		await page.reload();
		await expect(page).toHaveURL(/\/dashboard$/);
	});

	test('prefills the login field from local storage after logout', async function ({ page }) {
		await page.getByLabel('Login name').fill('remember-me@example.com');
		await page.getByLabel('Password').fill('StrongPassword123!');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page).toHaveURL(/\/dashboard$/);
		await page.getByRole('button', { name: 'Logout' }).click();
		await expect(page).toHaveURL(/\/login$/);
		await expect(page.getByLabel('Login name')).toHaveValue('remember-me@example.com');
		await expect(page.getByLabel('Password')).toHaveValue('');
	});

	test('logs out and protects the dashboard again', async function ({ page }) {
		await page.getByLabel('Login name').fill('demo@example.com');
		await page.getByLabel('Password').fill('StrongPassword123!');
		await page.getByRole('button', { name: 'OK' }).click();
		await expect(page).toHaveURL(/\/dashboard$/);
		await page.getByRole('button', { name: 'Logout' }).click();
		await expect(page).toHaveURL(/\/login$/);
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/login$/);
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
