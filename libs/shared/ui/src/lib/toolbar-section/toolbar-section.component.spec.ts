import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { ToolbarSectionComponent } from './toolbar-section.component';

describe('ToolbarSectionComponent', () => {
	test('creates the standalone Toolbar Section component', async () => {
		await TestBed.configureTestingModule({
			imports: [ToolbarSectionComponent],
		}).compileComponents();

		const fixture = TestBed.createComponent(ToolbarSectionComponent);

		expect(fixture.componentInstance).toBeInstanceOf(ToolbarSectionComponent);
	});
});
