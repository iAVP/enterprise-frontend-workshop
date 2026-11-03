import { Routes } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';

export const appRoutes: Routes = [
	{
		path: ROUTE.LOGIN,
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.LoginPageComponent),
	},
	{
		path: ROUTE.DASHBOARD,
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.DashboardPageComponent),
	},
	{
		path: ROUTE.ADD_INCOME,
		data: { type: TransactionType.income },
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPageComponent),
	},
	{
		path: ROUTE.ADD_EXPENSE,
		data: { type: TransactionType.expense },
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPageComponent),
	},
	{ path: ROUTE.ROOT, pathMatch: 'full', redirectTo: ROUTE.DASHBOARD },
	{ path: ROUTE.NOT_FOUND, redirectTo: ROUTE.DASHBOARD },
];
