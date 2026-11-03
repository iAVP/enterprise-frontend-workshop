import { StorageService } from './storage.service';

describe('StorageService', () => {
	let service: StorageService;

	beforeEach(function () {
		const values = new Map<string, string>();
		const fakeStorage = {
			getItem: vi.fn(function (key: string): string | null {
				return values.get(key) ?? null;
			}),
			setItem: vi.fn(function (key: string, value: string): void {
				values.set(key, value);
			}),
			removeItem: vi.fn(function (key: string): void {
				values.delete(key);
			}),
		};
		vi.stubGlobal('localStorage', fakeStorage);
		service = new StorageService();
	});

	afterEach(function () {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	test('serializes and reads a stored value', function () {
		expect(service.saveToLocalStorage('settings', { theme: 'dark' })).toBe(true);
		expect(service.getFromLocalStorage<{ theme: string }>('settings')).toEqual({ theme: 'dark' });
	});

	test('returns null when a key does not exist', function () {
		expect(service.getFromLocalStorage('missing')).toBeNull();
	});

	test('returns null for malformed JSON', function () {
		localStorage.setItem('broken', '{');
		expect(service.getFromLocalStorage('broken')).toBeNull();
	});

	test('returns false when storage writes fail', function () {
		vi.spyOn(localStorage, 'setItem').mockImplementation(function () {
			throw new Error('Storage unavailable');
		});
		expect(service.saveToLocalStorage('settings', {})).toBe(false);
	});

	test('removes a stored value', function () {
		localStorage.setItem('settings', 'true');
		expect(service.removeFromLocalStorage('settings')).toBe(true);
		expect(localStorage.getItem('settings')).toBeNull();
	});
});
