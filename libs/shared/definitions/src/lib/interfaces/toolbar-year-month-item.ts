import type { ToolbarSectionItemBase } from './toolbar-section-item-base';
import type { ToolbarYearMonthOption } from './toolbar-year-month-option';
import type { ToolbarYearMonthValue } from './toolbar-year-month-value';
import { TOOLBAR_ITEM_TYPE } from '../constants/toolbar-item-type';

/** Configuration for a Toolbar year/month item. */
export interface ToolbarYearMonthItem extends ToolbarSectionItemBase {
	/** Year/month item discriminator. */
	type: typeof TOOLBAR_ITEM_TYPE.yearMonth;
	/** Available years. */
	years: number[];
	/** Available month options for the currently selected year. */
	months: ToolbarYearMonthOption[];
	/** Current selected year and month. */
	value?: ToolbarYearMonthValue;
	/** Optional labels for the year and month fields. */
	labels?: {
		/** Label for the year field. */
		year: string;
		/** Label for the month field. */
		month: string;
	};
	/** Optional action invoked when the year or month changes. */
	callback?: (value: ToolbarYearMonthValue) => void;
}