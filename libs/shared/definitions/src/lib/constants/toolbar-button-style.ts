/** Supported Angular Material button variants for Toolbar button items. */
export const TOOLBAR_BUTTON_STYLE = {
	text: 'text',
	outlined: 'outlined',
	filled: 'filled',
	elevated: 'elevated',
	tonal: 'tonal',
} as const;

/** Button style values supported by Toolbar button items. */
export type ToolbarButtonStyle = typeof TOOLBAR_BUTTON_STYLE[keyof typeof TOOLBAR_BUTTON_STYLE];
