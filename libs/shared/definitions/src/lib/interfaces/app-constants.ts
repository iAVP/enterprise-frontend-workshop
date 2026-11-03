import type { TransactionConstants } from './transaction-constants';

/** Contract for the application's shared constants object. */
export interface AppConstants {
    readonly TRANSACTIONS: TransactionConstants;
}
