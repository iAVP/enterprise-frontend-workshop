import { Injectable, signal } from '@angular/core';
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
}
