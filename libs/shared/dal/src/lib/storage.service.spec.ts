import { StorageService } from './storage.service';

describe('StorageService', () => {
	let service: StorageService;

	beforeEach(() => {
		service = new StorageService();
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test('serializes and reads a stored value', () => {
		expect(service.saveToLocalStorage('settings', { theme: 'dark' })).toBe(true);
		expect(service.getFromLocalStorage<{ theme: string }>('settings')).toEqual({ theme: 'dark' });
	});

	test('returns null when a key does not exist', () => {
		expect(service.getFromLocalStorage('missing')).toBeNull();
	});

	test('returns null for malformed JSON', () => {
		localStorage.setItem('broken', '{');
		expect(service.getFromLocalStorage('broken')).toBeNull();
	});

	test('returns false when storage writes fail', () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('Storage unavailable');
		});
		expect(service.saveToLocalStorage('settings', {})).toBe(false);
	});

	test('removes a stored value', () => {
		localStorage.setItem('settings', 'true');
		expect(service.removeFromLocalStorage('settings')).toBe(true);
		expect(localStorage.getItem('settings')).toBeNull();
	});
});
