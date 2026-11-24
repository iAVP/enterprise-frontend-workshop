import type { ToolbarSectionItemBase } from './toolbar-section-item-base';
import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';

/** Configuration for a non-interactive Toolbar text item. */
export interface ToolbarTextItem extends ToolbarSectionItemBase {
	/** Text item discriminator. */
	type: typeof TOOLBAR_ITEM_TYPE.text;
	/** Text displayed by the item. */
	text: string;
}
