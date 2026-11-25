import type { ToolbarSection } from '../interfaces/toolbar-section';

/** Configuration for the shared Toolbar sections. */
export interface ToolbarConfig {
	/** Sections rendered on the left side of the Toolbar. */
	left?: ToolbarSection[];
	/** Sections rendered in the center of the Toolbar. */
	center?: ToolbarSection[];
	/** Sections rendered on the right side of the Toolbar. */
	right?: ToolbarSection[];
}
