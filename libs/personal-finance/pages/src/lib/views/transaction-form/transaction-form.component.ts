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
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  private readonly dialogRef = inject(ModalDialogRef<Omit<Transaction, 'id'>>);
  private readonly dialogData = inject(MODAL_DIALOG_DATA) as TransactionFormDialogData;

  /** Provides the configured display currency. */
  protected readonly currency = COMMON.DEFAULT_CURRENCY;
  protected description = '';
  protected amount = '';
  protected date = new Date().toISOString().slice(0, 10);
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
