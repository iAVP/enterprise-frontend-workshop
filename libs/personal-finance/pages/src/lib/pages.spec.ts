import { DashboardPage } from './views/dashboard/dashboard.page';
import { LoginPage } from './views/login/login.page';
import { TransactionFormPage } from './views/transaction-form/transaction-form.page';

describe('Personal Finance pages', () => {
	test('exports the application page components', () => {
		expect(LoginPage).toBeDefined();
		expect(DashboardPage).toBeDefined();
		expect(TransactionFormPage).toBeDefined();
	});
});
