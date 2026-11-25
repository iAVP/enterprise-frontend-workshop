import { TestBed } from '@angular/core/testing';
import { DASHBOARD_TOOLBAR_CONFIG } from '@workshop:def:consts';
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
});
