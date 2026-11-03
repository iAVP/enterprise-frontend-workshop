import type { AppConstants } from '../interfaces';

/** Shared application constants. */
export const CONSTANTS = {
    TRANSACTIONS: {
        storageKey: 'personal-finance.transactions',
    },
} as const satisfies AppConstants;
