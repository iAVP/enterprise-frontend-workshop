import { Component, inject } from '@angular/core';
import { COMMON } from '@workshop:common';
import { TransactionType } from '@workshop:def:enums';
import type { Transaction } from '@workshop:def:interfaces';
import { ModalDialogRef, MODAL_DIALOG_DATA } from '@workshop:ui';

interface TransactionFormDialogData {
  type: TransactionType;
}

/** Collects transaction details and returns them to the caller through ModalDialog. */
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  templateUrl: './transaction-form.page.html',
  styleUrl: './transaction-form.page.scss',
})
export class TransactionFormComponent {
  private readonly dialogRef = inject(ModalDialogRef<Omit<Transaction, 'id'>>);
  private readonly dialogData = inject(MODAL_DIALOG_DATA) as TransactionFormDialogData;

  /** Provides the configured display currency. */
  protected readonly currency = COMMON.DEFAULT_CURRENCY;

  /** Stores the transaction description entered by the user. */
  protected description = '';

  /** Stores the amount entered by the user before numeric conversion. */
  protected amount = '';

  /** Stores the transaction date in ISO date format. */
  protected date = new Date().toISOString().slice(0, 10);

  /** Holds validation feedback for the transaction form. */
  protected errorMessage = '';

  /** Returns the heading for the active transaction kind. */
  protected get title(): string {
    return this.dialogData.type === TransactionType.income ? 'Add income' : 'Add expense';
  }

  /** Validates the form and returns the transaction data to the dialog caller. */
  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const numericAmount = Number(this.amount);
    if (
      !this.description.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      !this.date
    ) {
      this.errorMessage = 'Enter a description, a date, and an amount greater than zero.';
      return;
    }

    this.dialogRef.close({
      type: this.dialogData.type,
      description: this.description.trim(),
      amount: numericAmount,
      date: this.date,
    });
  }

  /** Closes the dialog without returning a transaction. */
  protected onCancel(): void {
    this.dialogRef.close();
  }
}
