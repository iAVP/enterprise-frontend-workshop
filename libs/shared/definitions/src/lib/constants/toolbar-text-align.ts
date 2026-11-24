/** Supported text alignment values for shared Toolbar sections. */
export const TOOLBAR_TEXT_ALIGN = {
	left: 'left',
	center: 'center',
	right: 'right',
} as const;

/** Text alignment values supported by Toolbar sections. */
export type ToolbarTextAlign = typeof TOOLBAR_TEXT_ALIGN[keyof typeof TOOLBAR_TEXT_ALIGN];
