import '@angular/compiler';

import { DashboardPage } from './views/dashboard/dashboard.page';
import { LoginPage } from './views/login/login.page';
import { TransactionFormComponent } from './views/transaction-form/transaction-form.component';

describe('Personal Finance pages', () => {
  test('exports the application page components', () => {
    expect(LoginPage).toBeDefined();
    expect(DashboardPage).toBeDefined();
    expect(TransactionFormComponent).toBeDefined();
  });
});
