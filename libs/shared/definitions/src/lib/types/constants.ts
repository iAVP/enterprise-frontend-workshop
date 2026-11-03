/** Contract for transaction-related application constants. */
export interface TransactionConstants {
    readonly storageKey: string;
}

/** Contract for the application's shared constants object. */
export interface AppConstants {
    readonly TRANSACTIONS: TransactionConstants;
}
