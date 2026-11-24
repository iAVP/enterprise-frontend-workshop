import type { ToolbarButtonItem } from '../interfaces/toolbar-button-item';
import type { ToolbarDropdownItem } from '../interfaces/toolbar-dropdown-item';
import type { ToolbarDateRangeItem } from '../interfaces/toolbar-date-range-item';
import type { ToolbarYearMonthItem } from '../interfaces/toolbar-year-month-item';
import type { ToolbarTextItem } from '../interfaces/toolbar-text-item';

/** Discriminated union of supported Toolbar section item configurations. */
export type ToolbarSectionItem =
	| ToolbarButtonItem
	| ToolbarDropdownItem
	| ToolbarDateRangeItem
	| ToolbarYearMonthItem
	| ToolbarTextItem;
