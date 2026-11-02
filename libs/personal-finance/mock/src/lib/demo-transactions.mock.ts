import type { Transaction } from '@workshop:def:interfaces';

/** Provides the initial demonstration transactions for the Personal Finance application. */
export const DEMO_TRANSACTIONS: Transaction[] = [
  { id: 'demo-01', type: 'income', description: 'Salary', amount: 3200, date: '2026-10-01' },
  { id: 'demo-02', type: 'expense', description: 'Rent', amount: 1100, date: '2026-10-02' },
  { id: 'demo-03', type: 'expense', description: 'Groceries', amount: 86.4, date: '2026-10-03' },
  { id: 'demo-04', type: 'income', description: 'Freelance work', amount: 450, date: '2026-10-04' },
  { id: 'demo-05', type: 'expense', description: 'Transport', amount: 49, date: '2026-10-05' },
  { id: 'demo-06', type: 'expense', description: 'Utilities', amount: 125.7, date: '2026-10-06' },
  { id: 'demo-07', type: 'income', description: 'Refund', amount: 35, date: '2026-10-07' },
  { id: 'demo-08', type: 'expense', description: 'Books', amount: 28.9, date: '2026-10-08' },
  { id: 'demo-09', type: 'expense', description: 'Restaurant', amount: 42.5, date: '2026-10-09' },
  { id: 'demo-10', type: 'income', description: 'Interest', amount: 12.35, date: '2026-10-10' }
];
