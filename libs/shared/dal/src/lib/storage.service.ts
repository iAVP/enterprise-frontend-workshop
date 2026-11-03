import { Injectable } from '@angular/core';

/** Provides technical access to browser local storage with safe JSON handling. */
@Injectable({ providedIn: 'root' })
export class StorageService {
	/** Reads and deserializes a value from local storage. */
	getFromLocalStorage<T>(key: string): T | null {
		try {
			if (typeof localStorage === 'undefined') {
				return null;
			}

			const serializedValue = localStorage.getItem(key);
			return serializedValue === null ? null : JSON.parse(serializedValue) as T;
		} catch {
			return null;
		}
	}

	/** Serializes and stores a value in local storage. */
	saveToLocalStorage(key: string, value: unknown): boolean {
		try {
			if (typeof localStorage === 'undefined') {
				return false;
			}

			const serializedValue = JSON.stringify(value);
			if (serializedValue === undefined) {
				return false;
			}

			localStorage.setItem(key, serializedValue);
			return true;
		} catch {
			return false;
		}
	}

	/** Removes a value from local storage. */
	removeFromLocalStorage(key: string): boolean {
		try {
			if (typeof localStorage === 'undefined') {
				return false;
			}

			localStorage.removeItem(key);
			return true;
		} catch {
			return false;
		}
	}
}
