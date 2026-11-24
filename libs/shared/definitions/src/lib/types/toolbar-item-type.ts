import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';

/** Item type values supported by Toolbar configuration. */
export type ToolbarItemType = typeof TOOLBAR_ITEM_TYPE[keyof typeof TOOLBAR_ITEM_TYPE];
