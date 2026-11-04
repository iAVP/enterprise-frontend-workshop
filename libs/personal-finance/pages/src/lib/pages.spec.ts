import '@angular/compiler';

import { DashboardPage } from '../index';
import { LoginPageComponent } from '../index';
import { TransactionFormComponent } from '../index';

describe('Personal Finance pages', () => {
  test('exports the application page components', () => {
    expect(LoginPageComponent).toBeDefined();
    expect(DashboardPage).toBeDefined();
    expect(TransactionFormComponent).toBeDefined();
  });
});
