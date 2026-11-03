import type { AppConstants } from '../types';

/** Shared application constants. */
export const CONSTANTS = {
    TRANSACTIONS: {
        storageKey: 'personal-finance.transactions',
    },
} as const satisfies AppConstants;
