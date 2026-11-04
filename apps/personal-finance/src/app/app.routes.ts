import { Routes } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';

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
  { path: ROUTE.ROOT, pathMatch: 'full', redirectTo: ROUTE.DASHBOARD },
  { path: ROUTE.NOT_FOUND, redirectTo: ROUTE.DASHBOARD },
];
