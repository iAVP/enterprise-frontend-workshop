import { Component, effect, input, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import type {
	ToolbarYearMonthItem,
	ToolbarYearMonthValue,
} from '@workshop:def:interfaces';

/** Renders a Toolbar item for selecting a year and month. */
@Component({
	selector: 'ui-toolbar-year-month-item',
	standalone: true,
	imports: [MatFormFieldModule, MatSelectModule],
	templateUrl: './toolbar-year-month-item.component.html',
	styleUrl: './toolbar-year-month-item.component.scss',
})
export class ToolbarYearMonthItemComponent {
	/** Year/month configuration and optional selection callback. */
	readonly item = input.required<ToolbarYearMonthItem>();

	/** Currently selected calendar year. */
	protected readonly year = signal<number | null>(null);

	/** Currently selected calendar month. */
	protected readonly month = signal<number | null>(null);

	/** Synchronizes local selection with the input configuration. */
	constructor() {
		effect(() => {
			const value = this.item().value;

			this.year.set(value?.year ?? null);
			this.month.set(value?.month ?? null);
		});
	}

	/** Updates the selected year and emits the selection. */
	protected onYearChange(value: number | null): void {
		this.year.set(value);
		this.emitSelection();
	}

	/** Updates the selected month and emits the selection. */
	protected onMonthChange(value: number | null): void {
		this.month.set(value);
		this.emitSelection();
	}

	/** Emits the selected year/month or shows the implementation placeholder. */
	protected emitSelection(): void {
		const value: ToolbarYearMonthValue = {
			year: this.year(),
			month: this.month(),
		};
		const callback = this.item().callback;

		if (callback) {
			callback(value);
			return;
		}

		window.alert('Not yet implemented');
	}
}