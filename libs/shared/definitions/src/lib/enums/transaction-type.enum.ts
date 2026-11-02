/** Defines the signed transaction type used when calculating account balances. */
export enum TransactionType {
  /** Adds an amount to the account balance. */
  Income = 1,
  /** Subtracts an amount from the account balance. */
  Expense = -1
}
