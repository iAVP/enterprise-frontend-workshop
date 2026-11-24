import { TOOLBAR_TEXT_ALIGN } from '../constants/toolbar-text-align';

/** Text alignment values supported by Toolbar sections. */
export type ToolbarTextAlign = typeof TOOLBAR_TEXT_ALIGN[keyof typeof TOOLBAR_TEXT_ALIGN];
