/** Month option used by a Toolbar year/month item. */
export interface ToolbarYearMonthOption {
	/** Calendar month number from 1 through 12. */
	value: number;
	/** User-facing month label. */
	label: string;
	/** Optional disabled state for the month. */
	disabled?: boolean;
}
