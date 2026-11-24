import { Component, effect, input, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import type {
	ToolbarDateRangeItem,
	ToolbarDateRangeValue,
} from '@workshop:def:interfaces';

/** Renders a Toolbar item for selecting a date range. */
@Component({
	selector: 'ui-toolbar-date-range-item',
	standalone: true,
	imports: [
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
	],
	templateUrl: './toolbar-date-range-item.component.html',
	styleUrl: './toolbar-date-range-item.component.scss',
})
export class ToolbarDateRangeItemComponent {
	/** Date range item configuration and callback. */
	readonly item = input.required<ToolbarDateRangeItem>();

	/** Currently selected start date. */
	protected readonly from = signal<Date | null>(null);

	/** Currently selected end date. */
	protected readonly to = signal<Date | null>(null);

	/** Synchronizes the local date selection with the input configuration. */
	constructor() {
		effect(() => {
			const value = this.item().value;

			this.from.set(value?.from ?? null);
			this.to.set(value?.to ?? null);
		});
	}

	/** Updates the selected start date and emits the date range. */
	protected onFromChange(value: Date | null): void {
		this.from.set(value);
		this.emitDateRange();
	}

	/** Updates the selected end date and emits the date range. */
	protected onToChange(value: Date | null): void {
		this.to.set(value);
		this.emitDateRange();
	}

	/** Emits the currently selected date range. */
	protected emitDateRange(): void {
		const value: ToolbarDateRangeValue = {
			from: this.from(),
			to: this.to(),
		};

		this.item().callback(value);
	}
}
