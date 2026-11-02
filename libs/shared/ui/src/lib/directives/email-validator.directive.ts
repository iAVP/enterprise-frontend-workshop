import { Directive, ElementRef, HostListener, output } from '@angular/core';
import { VALIDATION_REGEX } from '@workshop:def:consts';
import type { FieldValidationResult } from '@workshop:def:interfaces';

/** Validates an email input and emits feedback without changing its DOM. */
@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
})
export class EmailValidatorDirective {
  /** Emits the current email validation result. */
  readonly emailValidationChange = output<FieldValidationResult>();

  /** Tracks whether the host input has been visited. */
  private touched = false;

  /** Provides access to the host input element. */
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  /** Validates the value whenever the user edits the input. */
  @HostListener('input')
  protected onInput(): void {
    this.validate(this.touched);
  }

  /** Marks the input as touched and displays required feedback when needed. */
  @HostListener('blur')
  protected onBlur(): void {
    this.touched = true;
    this.validate(true);
  }

  /** Runs validation explicitly before the parent form is submitted. */
  validateNow(): FieldValidationResult {
    this.touched = true;
    return this.validate(true);
  }

  /** Resets the touched state and clears the current validation message. */
  reset(): void {
    this.touched = false;
    this.emailValidationChange.emit({ valid: false, message: '' });
  }

  /** Checks the host value and publishes the resulting validation state. */
  private validate(showRequiredError: boolean): FieldValidationResult {
    const value = this.elementRef.nativeElement.value.trim();
    let result: FieldValidationResult;

    if (!value) {
      result = {
        valid: false,
        message: showRequiredError ? 'Login name is required.' : '',
      };
    } else if (!VALIDATION_REGEX.EMAIL.test(value)) {
      result = { valid: false, message: 'Enter a valid email address.' };
    } else {
      result = { valid: true, message: '' };
    }

    this.emailValidationChange.emit(result);
    return result;
  }
}
