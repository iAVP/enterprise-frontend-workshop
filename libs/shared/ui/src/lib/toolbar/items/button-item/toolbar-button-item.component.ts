import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import type { ToolbarButtonItem } from '@workshop:def:interfaces';

/** Renders and handles a configured Toolbar button item. */
@Component({
	selector: 'ui-toolbar-button-item',
	standalone: true,
	imports: [CommonModule, MatButtonModule],
	templateUrl: './toolbar-button-item.component.html',
	styleUrl: './toolbar-button-item.component.scss',
})
export class ToolbarButtonItemComponent {
	/** Button configuration including presentation and optional callback. */
	readonly item = input.required<ToolbarButtonItem>();

	/** Executes the configured action or shows the implementation placeholder. */
	protected onClick(): void {
		const callback = this.item().callback;

		if (callback) {
			callback();
			return;
		}

		window.alert('Not yet implemented');
	}
}