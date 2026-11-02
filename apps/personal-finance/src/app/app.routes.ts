import { Routes } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';

export const appRoutes: Routes = [
  {
    path: ROUTE.LOGIN,
    loadComponent: () =>
      import('@workshop:personal-finance:pages').then((pages) => pages.LoginPage),
  },
  {
    path: ROUTE.DASHBOARD,
    loadComponent: () =>
      import('@workshop:personal-finance:pages').then((pages) => pages.DashboardPage),
  },
  {
    path: ROUTE.ADD_INCOME,
    data: { type: TransactionType.Income },
    loadComponent: () =>
      import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPage),
  },
  {
    path: ROUTE.ADD_EXPENSE,
    data: { type: TransactionType.Expense },
    loadComponent: () =>
      import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPage),
  },
  { path: ROUTE.ROOT, pathMatch: 'full', redirectTo: ROUTE.DASHBOARD },
  { path: ROUTE.NOT_FOUND, redirectTo: ROUTE.DASHBOARD },
];
