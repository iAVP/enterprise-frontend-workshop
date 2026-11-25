import { TOOLBAR_ITEM_TYPE } from './toolbar-item-type';
import { TOOLBAR_BUTTON_STYLE } from './toolbar-button-style';
import type { ToolbarConfig } from '../types/toolbar-config';

/** Initial static Toolbar configuration for the Personal Finance Dashboard. */
export const DASHBOARD_TOOLBAR_CONFIG: ToolbarConfig = {
	left: [
		{
			items: [
				{
					id: 'mark-transactions',
					type: TOOLBAR_ITEM_TYPE.button,
					style: TOOLBAR_BUTTON_STYLE.outlined,
					text: 'Mark Transactions',
					icon: 'checklist',
				},
				{
					id: 'income',
					type: TOOLBAR_ITEM_TYPE.button,
					style: TOOLBAR_BUTTON_STYLE.outlined,
					text: 'Income',
					icon: 'add_circle',
				},
				{
					id: 'expense',
					type: TOOLBAR_ITEM_TYPE.button,
					style: TOOLBAR_BUTTON_STYLE.outlined,
					text: 'Expense',
					icon: 'remove_circle',
				},
				{
					id: 'notes-filter',
					type: TOOLBAR_ITEM_TYPE.dropdown,
					options: [
						{ value: 'all', label: 'All Transactions' },
						{ value: 'with-notes', label: 'With Notes' },
						{ value: 'without-notes', label: 'Without Notes' },
					],
					value: 'all',
				},
			],
		},
	],
	center: [
		{
			items: [
				{
					id: 'period',
					type: TOOLBAR_ITEM_TYPE.dropdown,
					options: [
						{ value: 'current-month', label: 'Current Month' },
						{ value: 'last-30-days', label: 'Last 30 Days' },
						{ value: 'last-60-days', label: 'Last 60 Days' },
						{ value: 'last-90-days', label: 'Last 90 Days' },
						{ value: 'last-180-days', label: 'Last 180 Days' },
						{ value: 'custom', label: 'Custom' },
						{ value: 'year-month', label: 'Year/Month' },
					],
					value: 'current-month',
				},
				{
					id: 'date-range',
					type: TOOLBAR_ITEM_TYPE.dateRange,
					value: { from: null, to: null },
					labels: { from: 'From', to: 'To' },
				},
				{
					id: 'year-month',
					type: TOOLBAR_ITEM_TYPE.yearMonth,
					years: [2021, 2022, 2023, 2024, 2025, 2026],
					months: [
						{ value: 1, label: 'January' },
						{ value: 2, label: 'February' },
						{ value: 3, label: 'March' },
						{ value: 4, label: 'April' },
						{ value: 5, label: 'May' },
						{ value: 6, label: 'June' },
						{ value: 7, label: 'July' },
						{ value: 8, label: 'August' },
						{ value: 9, label: 'September' },
						{ value: 10, label: 'October' },
						{ value: 11, label: 'November' },
						{ value: 12, label: 'December' },
					],
					value: { year: null, month: null },
					labels: { year: 'Year', month: 'Month' },
				},
			],
		},
	],
	right: [
		{
			items: [
				{
					id: 'settings',
					type: TOOLBAR_ITEM_TYPE.button,
					style: TOOLBAR_BUTTON_STYLE.outlined,
					text: 'Settings',
					icon: 'settings',
				},
				{
					id: 'export',
					type: TOOLBAR_ITEM_TYPE.button,
					style: TOOLBAR_BUTTON_STYLE.outlined,
					text: 'Export',
					icon: 'download',
				},
			],
		},
	],
};
