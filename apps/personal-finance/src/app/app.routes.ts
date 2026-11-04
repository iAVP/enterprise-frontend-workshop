import { Routes } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
import { TransactionType } from '@workshop:def:enums';
import { authGuard } from './auth.guard';

export const appRoutes: Routes = [
	{
		path: ROUTE.LOGIN,
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.LoginPageComponent),
	},
	{
		path: ROUTE.DASHBOARD,
		canActivate: [authGuard],
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.DashboardPageComponent),
	},
	{
		path: ROUTE.ADD_INCOME,
		canActivate: [authGuard],
		data: { type: TransactionType.income },
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPageComponent),
	},
	{
		path: ROUTE.ADD_EXPENSE,
		canActivate: [authGuard],
		data: { type: TransactionType.expense },
		loadComponent: () => import('@workshop:personal-finance:pages').then((pages) => pages.TransactionFormPageComponent),
	},
	{ path: ROUTE.ROOT, pathMatch: 'full', redirectTo: ROUTE.DASHBOARD },
	{ path: ROUTE.NOT_FOUND, redirectTo: ROUTE.DASHBOARD },
];
