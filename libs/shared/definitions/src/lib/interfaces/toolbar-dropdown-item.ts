import type { ToolbarSectionItemBase } from './toolbar-section-item-base';
import type { ToolbarDropdownOption } from './toolbar-dropdown-option';
import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';

/** Configuration for a Toolbar dropdown item. */
export interface ToolbarDropdownItem extends ToolbarSectionItemBase {
	/** Dropdown item discriminator. */
	type: typeof TOOLBAR_ITEM_TYPE.dropdown;
	/** Available dropdown options. */
	options: ToolbarDropdownOption[];
	/** Currently selected option value. */
	value?: string | number;
	/** Optional placeholder shown when no value is selected. */
	placeholder?: string;
	/** Action invoked with the selected option value. */
	callback: (value: string | number) => void;
}
