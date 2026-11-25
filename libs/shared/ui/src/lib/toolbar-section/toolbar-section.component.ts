import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TOOLBAR_ITEM_TYPE } from '@workshop:def:consts';
import type { ToolbarSectionItem } from '@workshop:def:types';
import { ToolbarButtonItemComponent } from '../toolbar-button-item';
import { ToolbarDateRangeItemComponent } from '../toolbar-date-range-item';
import { ToolbarDropdownItemComponent } from '../toolbar-dropdown-item';
import { ToolbarTextItemComponent } from '../toolbar-text-item';
import { ToolbarYearMonthItemComponent } from '../toolbar-year-month-item';
import type { ToolbarSection } from '@workshop:def:interfaces';

/** Renders a configurable Toolbar section and its dynamic items. */
@Component({
	selector: 'ui-toolbar-section',
	standalone: true,
	imports: [
		NgClass,
		ToolbarButtonItemComponent,
		ToolbarDateRangeItemComponent,
		ToolbarDropdownItemComponent,
		ToolbarTextItemComponent,
		ToolbarYearMonthItemComponent,
	],
	templateUrl: './toolbar-section.component.html',
	styleUrl: './toolbar-section.component.scss',
})
export class ToolbarSectionComponent {
	/** Section configuration including layout and item definitions. */
	readonly section = input.required<ToolbarSection>();

	/** Supported item types used to render configured items. */
	protected readonly itemType = TOOLBAR_ITEM_TYPE;

	/** Maps configured text alignment to the flexbox alignment value. */
	protected readonly justifyContent = computed(() => {
		const textAlign = this.section().textAlign;

		switch (textAlign) {
			case 'center':
				return 'center';
			case 'right':
				return 'flex-end';
			case 'left':
			default:
				return 'flex-start';
		}
	});

	/** Returns the configured item as a specific Toolbar item type. */
	protected getItem<T extends ToolbarSectionItem>(item: ToolbarSectionItem): T {
		return item as T;
	}
}
