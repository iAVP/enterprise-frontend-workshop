import '@angular/compiler';

import { DashboardPageComponent } from './views/dashboard/dashboard.page';
import { LoginPageComponent } from './views/login/login.page';
import { TransactionFormPageComponent } from './views/transaction-form/transaction-form.page';

describe('Personal Finance pages', () => {
	test('exports the application page components', () => {
		expect(LoginPageComponent).toBeDefined();
		expect(DashboardPageComponent).toBeDefined();
		expect(TransactionFormPageComponent).toBeDefined();
	});
});
