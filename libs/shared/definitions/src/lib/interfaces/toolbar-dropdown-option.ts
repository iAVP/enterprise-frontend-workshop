/** Option displayed by a Toolbar dropdown item. */
export interface ToolbarDropdownOption {
	/** Value emitted when the option is selected. */
	value: string | number;
	/** User-facing option label. */
	label: string;
	/** Optional disabled state for the option. */
	disabled?: boolean;
}
