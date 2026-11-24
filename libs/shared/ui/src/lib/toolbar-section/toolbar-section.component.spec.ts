import { ToolbarSectionComponent } from './toolbar-section.component';

describe('ToolbarSectionComponent', () => {
	test('exports the standalone Toolbar Section component', () => {
		expect(ToolbarSectionComponent).toBeDefined();
		expect(ToolbarSectionComponent.ɵcmp.standalone).toBe(true);
	});
});
