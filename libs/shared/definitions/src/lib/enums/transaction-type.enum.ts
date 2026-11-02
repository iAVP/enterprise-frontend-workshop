/** Defines the signed transaction type used when calculating account balances. */
export enum TransactionType {
  /** Adds an amount to the account balance. */
  income = 1,
  /** Subtracts an amount from the account balance. */
  expense = -1
}
