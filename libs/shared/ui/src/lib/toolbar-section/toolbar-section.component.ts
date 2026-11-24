import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import type { ToolbarSection } from '@workshop:def:interfaces';

/** Renders a configurable Toolbar section and projects its content. */
@Component({
	selector: 'ui-toolbar-section',
	standalone: true,
	imports: [NgClass],
	templateUrl: './toolbar-section.component.html',
	styleUrl: './toolbar-section.component.scss',
})
export class ToolbarSectionComponent {
	/** Section configuration including layout and item definitions. */
	readonly section = input.required<ToolbarSection>();

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
}
