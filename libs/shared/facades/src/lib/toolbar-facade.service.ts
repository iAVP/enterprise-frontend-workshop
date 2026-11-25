import { Injectable, signal } from '@angular/core';
import type { ToolbarSection } from '@workshop:def:interfaces';
import type { ToolbarSectionItem } from '@workshop:def:types';
import type { ToolbarConfig } from '@workshop:def:types';
import { DASHBOARD_TOOLBAR_CONFIG } from '@workshop:def:consts';

/** Manages reactive Toolbar configuration within the provider's scope. */
@Injectable()
export class ToolbarFacadeService {
	private readonly state = signal<ToolbarConfig>(DASHBOARD_TOOLBAR_CONFIG);

	/** Exposes the Toolbar configuration as a read-only signal. */
	readonly config = this.state.asReadonly();

	/** Replaces the complete Toolbar configuration. */
	setConfig(config: ToolbarConfig): void {
		this.state.set(config);
	}

	/** Replaces a section at the specified position and index. */
	setSection(position: keyof ToolbarConfig, index: number, section: ToolbarSection): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			if (index < 0 || index >= sections.length) {
				return config;
			}
			sections[index] = section;
			return { ...config, [position]: sections };
		});
	}

	/** Appends a section or inserts it at the specified index. */
	addSection(position: keyof ToolbarConfig, section: ToolbarSection, index?: number): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			const insertionIndex = index === undefined ? sections.length : Math.max(0, Math.min(index, sections.length));
			sections.splice(insertionIndex, 0, section);
			return { ...config, [position]: sections };
		});
	}

	/** Removes a section at the specified position and index. */
	removeSection(position: keyof ToolbarConfig, index: number): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			if (index < 0 || index >= sections.length) {
				return config;
			}
			sections.splice(index, 1);
			return { ...config, [position]: sections };
		});
	}

	/** Adds an item to the specified section, optionally at an item index. */
	addItem(position: keyof ToolbarConfig, sectionIndex: number, item: ToolbarSectionItem, itemIndex?: number): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			if (sectionIndex < 0 || sectionIndex >= sections.length) {
				return config;
			}
			const section = sections[sectionIndex];
			const items = [...section.items];
			const insertionIndex = itemIndex === undefined ? items.length : Math.max(0, Math.min(itemIndex, items.length));
			items.splice(insertionIndex, 0, item);
			sections[sectionIndex] = { ...section, items };
			return { ...config, [position]: sections };
		});
	}

	/** Removes an item identified by its ID from the specified section. */
	removeItem(position: keyof ToolbarConfig, sectionIndex: number, itemId: string): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			if (sectionIndex < 0 || sectionIndex >= sections.length) {
				return config;
			}
			const section = sections[sectionIndex];
			const items = section.items.filter((item) => item.id !== itemId);
			if (items.length === section.items.length) {
				return config;
			}
			sections[sectionIndex] = { ...section, items };
			return { ...config, [position]: sections };
		});
	}

	/** Updates an item identified by its ID in the specified section. */
	updateItem(position: keyof ToolbarConfig, sectionIndex: number, itemId: string, update: Partial<ToolbarSectionItem>): void {
		this.state.update((config) => {
			const sections = [...(config[position] ?? [])];
			if (sectionIndex < 0 || sectionIndex >= sections.length) {
				return config;
			}
			const section = sections[sectionIndex];
			const itemIndex = section.items.findIndex((item) => item.id === itemId);
			if (itemIndex < 0) {
				return config;
			}
			const items = [...section.items];
			items[itemIndex] = { ...items[itemIndex], ...update, id: itemId } as ToolbarSectionItem;
			sections[sectionIndex] = { ...section, items };
			return { ...config, [position]: sections };
		});
	}

	/** Moves an item between sections or positions, preserving its configuration. */
	moveItem(
		sourcePosition: keyof ToolbarConfig,
		sourceSectionIndex: number,
		itemId: string,
		targetPosition: keyof ToolbarConfig,
		targetSectionIndex: number,
		targetItemIndex?: number,
	): void {
		this.state.update((config) => {
			const sourceSections = [...(config[sourcePosition] ?? [])];
			const targetSections = sourcePosition === targetPosition ? sourceSections : [...(config[targetPosition] ?? [])];
			if (!this.hasValidSectionIndices(sourceSectionIndex, targetSectionIndex, sourceSections, targetSections)) {
				return config;
			}
			const sourceSection = sourceSections[sourceSectionIndex];
			const sourceItemIndex = sourceSection.items.findIndex((item) => item.id === itemId);
			if (sourceItemIndex < 0) {
				return config;
			}
			const item = sourceSection.items[sourceItemIndex];
			const sourceItems = [...sourceSection.items];
			sourceItems.splice(sourceItemIndex, 1);
			sourceSections[sourceSectionIndex] = { ...sourceSection, items: sourceItems };
			const targetSection = targetSections[targetSectionIndex];
			const targetItems = sourcePosition === targetPosition && sourceSectionIndex === targetSectionIndex
				? sourceItems
				: [...targetSection.items];
			const insertionIndex = targetItemIndex === undefined
				? targetItems.length
				: Math.max(0, Math.min(targetItemIndex, targetItems.length));
			targetItems.splice(insertionIndex, 0, item);
			targetSections[targetSectionIndex] = { ...targetSection, items: targetItems };
			return sourcePosition === targetPosition
				? { ...config, [sourcePosition]: targetSections }
				: { ...config, [sourcePosition]: sourceSections, [targetPosition]: targetSections };
		});
	}
	/** Checks whether both section indexes exist. */
	private hasValidSectionIndices(sourceIndex: number, targetIndex: number, sourceSections: ToolbarSection[], targetSections: ToolbarSection[]): boolean {
		return sourceIndex >= 0 && sourceIndex < sourceSections.length && targetIndex >= 0 && targetIndex < targetSections.length;
	}

}
