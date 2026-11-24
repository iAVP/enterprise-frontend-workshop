import type { ToolbarSectionItem } from '../types/toolbar-section-item';
import type { ToolbarTextAlign } from '../constants/toolbar-text-align';

/** Configuration for a Toolbar section and its item layout. */
export interface ToolbarSection {
	/** Items rendered inside the section. */
	items: ToolbarSectionItem[];
	/** Optional CSS class applied to the section. */
	class?: string;
	/** Text alignment applied to the section. */
	textAlign?: ToolbarTextAlign;
}
