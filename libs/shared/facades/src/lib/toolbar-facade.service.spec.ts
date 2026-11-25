import { TestBed } from '@angular/core/testing';
import { DASHBOARD_TOOLBAR_CONFIG, TOOLBAR_ITEM_TYPE } from '@workshop:def:consts';
import type { ToolbarSectionItem } from '@workshop:def:types';
import { ToolbarFacadeService } from './toolbar-facade.service';

describe('ToolbarFacadeService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [ToolbarFacadeService] });
	});

	it('exposes the initial Dashboard Toolbar configuration', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		expect(facade.config()).toBe(DASHBOARD_TOOLBAR_CONFIG);
	});

	it('replaces the configuration reactively', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		const config = { left: [], center: [], right: [] };
		facade.setConfig(config);
		expect(facade.config()).toBe(config);
	});

	it('keeps the facade configuration read-only from the public signal', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		expect(facade.config).toBeDefined();
		expect(typeof facade.config).toBe('function');
	});

	it('adds and removes sections', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		const section = { items: [] };
		facade.addSection('left', section);
		expect(facade.config().left?.at(-1)).toBe(section);
		facade.removeSection('left', facade.config().left!.length - 1);
		expect(facade.config().left?.at(-1)).not.toBe(section);
	});

	it('adds, updates, and removes items', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		const item: ToolbarSectionItem = {
			id: 'test-item',
			type: TOOLBAR_ITEM_TYPE.text,
			text: 'Initial',
		};
		facade.addItem('right', 0, item);
		facade.updateItem('right', 0, 'test-item', { text: 'Updated' });
		expect(facade.config().right?.[0].items.at(-1)).toEqual(expect.objectContaining({ text: 'Updated' }));
		facade.removeItem('right', 0, 'test-item');
		expect(facade.config().right?.[0].items.some((candidate) => candidate.id === 'test-item')).toBe(false);
	});

	it('moves an item between sections', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		const item: ToolbarSectionItem = {
			id: 'move-me',
			type: TOOLBAR_ITEM_TYPE.text,
			text: 'Move',
		};
		facade.addSection('center', { items: [] });
		facade.addItem('left', 0, item);
		facade.moveItem('left', 0, 'move-me', 'center', 1);
		expect(facade.config().left?.[0].items.some((candidate) => candidate.id === 'move-me')).toBe(false);
		expect(facade.config().center?.[1].items[0]).toBe(item);
	});

	it('removes the final Right Section item without retaining a visible section', () => {
		const facade = TestBed.inject(ToolbarFacadeService);
		const config = { left: [], center: [], right: [{ items: [{
			id: 'right-last',
			type: TOOLBAR_ITEM_TYPE.text,
			text: 'Last item',
		}] }] };
		facade.setConfig(config);
		facade.removeItem('right', 0, 'right-last');
		expect(facade.config().right?.[0].items).toEqual([]);
		expect(facade.config().right?.some(section => section.items.length > 0)).toBe(false);
	});
});
