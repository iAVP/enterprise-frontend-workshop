import { Component, computed, input } from '@angular/core';
import type { ToolbarConfig } from '@workshop:def:types';
import { ToolbarSectionComponent } from '../toolbar-section';

/** Main container for the universal Toolbar. */
@Component({
	selector: 'ui-toolbar',
	standalone: true,
	imports: [ToolbarSectionComponent],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	/** Reactive Toolbar configuration containing Left, Center, and Right sections. */
	readonly config = input.required<ToolbarConfig>();

	/** Indicates whether any Right Section contains visible items. */
	protected readonly hasRightItems = computed(() =>
		(this.config().right ?? []).some((section) => section.items.length > 0),
	);
}
