/** Shared application constants. */
export const CONSTANTS = {
    /** Transaction storage configuration. */
    TRANSACTIONS: {
        /** Local Storage key for transactions. */
        storageKey: 'personal-finance.transactions',
    },
    /** Authentication storage configuration. */
    AUTH_LOGIN: {
        /** Local Storage key for the saved login. */
        storageKey: 'personal-finance.login',
    },
} as const;