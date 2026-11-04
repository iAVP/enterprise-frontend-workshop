import type { TransactionType } from '@workshop:def:enums';

/** Data passed to the transaction form through the modal dialog. */
export interface TransactionFormDialogData {
  type: TransactionType;
}
