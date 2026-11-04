import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Provides a small JSON-based abstraction over browser localStorage.
 * The service keeps browser storage access out of feature and UI code.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly document = inject(DOCUMENT);

  /** Reads and deserializes a value. Returns null when it is missing or invalid. */
  getItem<T>(key: string): T | null {
    try {
      const storage = this.document.defaultView?.localStorage;
      const serialized = storage?.getItem(key);

      return serialized ? (JSON.parse(serialized) as T) : null;
    } catch {
      return null;
    }
  }

  /** Serializes and stores a value. Returns false when browser storage is unavailable. */
  setItem<T>(key: string, value: T): boolean {
    try {
      const storage = this.document.defaultView?.localStorage;
      if (!storage) {
        return false;
      }

      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /** Removes a stored value. Returns false when browser storage is unavailable. */
  removeItem(key: string): boolean {
    try {
      const storage = this.document.defaultView?.localStorage;
      if (!storage) {
        return false;
      }

      storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
}
