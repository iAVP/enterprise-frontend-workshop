import type { StatusBarItem } from './status-bar-item';

/** Configuration for a Status Bar section. */
export interface StatusBarSection {
	/** Optional section caption. */
	caption?: string;
	/** Optional CSS class applied to the section. */
	class?: string;
	/** Optional theme identifier used for section styling. */
	theme?: string;
	/** Items displayed in the section. */
	items: StatusBarItem[];
}
