import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import type { ToolbarDropdownItem } from '@workshop:def:interfaces';

/** Renders a configured Toolbar dropdown item. */
@Component({
	selector: 'ui-toolbar-dropdown-item',
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule],
	templateUrl: './toolbar-dropdown-item.component.html',
	styleUrl: './toolbar-dropdown-item.component.scss',
})
export class ToolbarDropdownItemComponent {
	/** Dropdown configuration and optional selection callback. */
	readonly item = input.required<ToolbarDropdownItem>();

	/** Emits the selected option or shows the implementation placeholder. */
	protected onSelectionChange(value: string | number): void {
		const callback = this.item().callback;

		if (callback) {
			callback(value);
			return;
		}

		window.alert('Not yet implemented');
	}
}