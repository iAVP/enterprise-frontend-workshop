import { Component, input } from '@angular/core';
import type { ToolbarConfig } from '@workshop:def:types';

/** Main container for the universal Toolbar. */
@Component({
	selector: 'ui-toolbar',
	standalone: true,
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
	/** Toolbar configuration for the upcoming section assembly. */
	readonly config = input.required<ToolbarConfig>();
}
