import type { ToolbarSectionItemBase } from './toolbar-section-item-base';
import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';
import type { ToolbarButtonStyle } from '../constants/toolbar-button-style';

/** Configuration for a Toolbar button item. */
export interface ToolbarButtonItem extends ToolbarSectionItemBase {
	/** Button item discriminator. */
	type: typeof TOOLBAR_ITEM_TYPE.button;
	/** Angular Material button variant. */
	style: ToolbarButtonStyle;
	/** Optional button label. */
	text?: string;
	/** Optional icon name. */
	icon?: string;
	/** Action invoked when the button is clicked. */
	callback: () => void;
}
