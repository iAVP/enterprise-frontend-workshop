import { Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { ToolbarTextItem } from '@workshop:def:interfaces';

/** Displays informational Toolbar text with overflow handling. */
@Component({
	selector: 'ui-toolbar-text-item',
	standalone: true,
	imports: [MatTooltipModule],
	templateUrl: './toolbar-text-item.component.html',
	styleUrl: './toolbar-text-item.component.scss',
})
export class ToolbarTextItemComponent {
	/** Text item configuration. */
	readonly item = input.required<ToolbarTextItem>();
}
