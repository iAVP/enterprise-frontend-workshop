import { expect, test } from '@playwright/test';

test('loads the Personal Finance dashboard', async function ({ page }) {
	await page.goto('/');

	expect(await page.locator('h1').innerText()).toContain('Personal Finance');
});
