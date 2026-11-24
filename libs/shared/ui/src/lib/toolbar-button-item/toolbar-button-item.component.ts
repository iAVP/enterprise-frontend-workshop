import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { ToolbarButtonItem } from '@workshop:def:interfaces';

/** Renders and handles a configured Toolbar button item. */
@Component({
	selector: 'ui-toolbar-button-item',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule],
	templateUrl: './toolbar-button-item.component.html',
	styleUrl: './toolbar-button-item.component.scss',
})
export class ToolbarButtonItemComponent {
	/** Button configuration including presentation and callback. */
	readonly item = input.required<ToolbarButtonItem>();

	/** Executes the configured action. */
	protected onClick(): void {
		this.item().callback();
	}
}
