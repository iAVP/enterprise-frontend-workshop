/** Configuration for a Status Bar item. */
export interface StatusBarItem {
	/** Text displayed by the item. */
	text: string;
	/** Optional CSS class applied to the item. */
	class?: string;
	/** Optional action invoked on a double click. */
	callback?: () => void;
}
