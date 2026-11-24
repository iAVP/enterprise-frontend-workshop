import { TOOLBAR_BUTTON_STYLE } from '../constants/toolbar-button-style';

/** Button style values supported by Toolbar button items. */
export type ToolbarButtonStyle = typeof TOOLBAR_BUTTON_STYLE[keyof typeof TOOLBAR_BUTTON_STYLE];
