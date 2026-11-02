import type { TransactionType } from '../types/transaction-type';

/** Represents one income or expense entry in Personal Finance. */
export interface Transaction {
  /** Identifies the transaction uniquely. */
  id: string;
  /** Identifies whether the transaction adds to or subtracts from the balance. */
  type: TransactionType;
  /** Describes the transaction. */
  description: string;
  /** Stores the transaction amount in the configured currency. */
  amount: number;
  /** Stores the transaction date in ISO date format. */
  date: string;
}
