import { TestBed } from '@angular/core/testing';
import type { ToolbarSectionItem } from '@workshop:def:types';
import { TOOLBAR_ITEM_TYPE } from '@workshop:def:consts';
import { ToolbarFacadeService } from './toolbar-facade.service';

describe('ToolbarFacadeService section and item operations', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [ToolbarFacadeService] });
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
		expect(facade.config().right?.[0].items.at(-1)?.text).toBe('Updated');
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
});
