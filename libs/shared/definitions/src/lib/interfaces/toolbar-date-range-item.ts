import type { ToolbarSectionItemBase } from './toolbar-section-item-base';
import type { ToolbarDateRangeValue } from './toolbar-date-range-value';
import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';

/** Configuration for a Toolbar date range item. */
export interface ToolbarDateRangeItem extends ToolbarSectionItemBase {
	/** Date range item discriminator. */
	type: typeof TOOLBAR_ITEM_TYPE.dateRange;
	/** Current date range value. */
	value?: ToolbarDateRangeValue;
	/** Optional labels for the start and end date fields. */
	labels?: {
		/** Label for the start date field. */
		from: string;
		/** Label for the end date field. */
		to: string;
	};
	/** Action invoked when the date range changes. */
	callback: (value: ToolbarDateRangeValue) => void;
}
