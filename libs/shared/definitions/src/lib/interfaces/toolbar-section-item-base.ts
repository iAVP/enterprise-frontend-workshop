import type { ToolbarItemType } from '../constants/toolbar-item-type';

/** Shared configuration contract for Toolbar section items. */
export interface ToolbarSectionItemBase {
	/** Unique identifier for the configured item. */
	id: string;
	/** Discriminator used to select the item component. */
	type: ToolbarItemType;
	/** Optional action invoked by the item interaction. */
	callback?: () => void;
}
