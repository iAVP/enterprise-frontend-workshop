import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { VALIDATION_REGEX } from '@workshop:def:consts';
import type { FieldValidationResult } from '@workshop:def:interfaces';
/** Validates a password input and emits feedback without changing its DOM. */
@Directive({selector:'[appPasswordValidator]',standalone:true})
export class PasswordValidatorDirective {
 /** Emits the current password validation result. */ @Output() readonly passwordValidationChange=new EventEmitter<FieldValidationResult>();
 private touched=false;
 constructor(private readonly elementRef:ElementRef<HTMLInputElement>){}
 /** Validates the value whenever the user edits the input. */ @HostListener('input') onInput():void{this.validate(this.touched);}
 /** Marks the input as touched and displays required feedback when needed. */ @HostListener('blur') onBlur():void{this.touched=true;this.validate(true);}
 /** Runs validation explicitly before the parent form is submitted. */ validateNow():FieldValidationResult{this.touched=true;return this.validate(true);}
 /** Resets the touched state and clears the current validation message. */ reset():void{this.touched=false;this.passwordValidationChange.emit({valid:false,message:''});}
 private validate(showRequiredError:boolean):FieldValidationResult{const value=this.elementRef.nativeElement.value;let result:FieldValidationResult;if(!value)result={valid:false,message:showRequiredError?'Password is required.':''};else if(!VALIDATION_REGEX.PASSWORD.test(value))result={valid:false,message:'Password must contain at least 12 characters, uppercase and lowercase letters, a number, and a special character.'};else result={valid:true,message:''};this.passwordValidationChange.emit(result);return result;}
}
