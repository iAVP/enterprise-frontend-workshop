import { Routes } from '@angular/router';
import { ROUTE } from '@workshop:def:consts';
export const appRoutes:Routes=[
 {path:ROUTE.LOGIN,loadComponent:()=>import('@workshop:personal-finance:pages').then(p=>p.LoginPage)},
 {path:ROUTE.DASHBOARD,loadComponent:()=>import('@workshop:personal-finance:pages').then(p=>p.DashboardPage)},
 {path:ROUTE.ADD_INCOME,data:{type:'income'},loadComponent:()=>import('@workshop:personal-finance:pages').then(p=>p.TransactionFormPage)},
 {path:ROUTE.ADD_EXPENSE,data:{type:'expense'},loadComponent:()=>import('@workshop:personal-finance:pages').then(p=>p.TransactionFormPage)},
 {path:ROUTE.ROOT,pathMatch:'full',redirectTo:ROUTE.DASHBOARD},{path:ROUTE.NOT_FOUND,redirectTo:ROUTE.DASHBOARD},
];
