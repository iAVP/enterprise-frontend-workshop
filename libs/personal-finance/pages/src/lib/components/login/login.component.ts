import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import type { FieldValidationResult } from '@workshop:def:interfaces';
import { EmailValidatorDirective, PasswordValidatorDirective } from '@workshop:ui';
/** Contains credentials emitted after successful local form validation. */
export interface LoginCredentials{email:string;password:string;}
/** Presents the login form and coordinates reusable field validators. */
@Component({selector:'app-login',standalone:true,imports:[EmailValidatorDirective,PasswordValidatorDirective],templateUrl:'./login.component.html',styleUrl:'./login.component.scss'})
export class LoginComponent{
 /** Emits credentials after both fields pass local validation. */ @Output() readonly loginRequested=new EventEmitter<LoginCredentials>();
 @ViewChild(EmailValidatorDirective) private emailValidator!:EmailValidatorDirective;
 @ViewChild(PasswordValidatorDirective) private passwordValidator!:PasswordValidatorDirective;
 email='';password='';emailError='';passwordError='';
 /** Stores the current email value. */ onEmailInput(value:string):void{this.email=value;}
 /** Stores the current password value. */ onPasswordInput(value:string):void{this.password=value;}
 /** Updates the email validation feedback. */ onEmailValidationChange(result:FieldValidationResult):void{this.emailError=result.message;}
 /** Updates the password validation feedback. */ onPasswordValidationChange(result:FieldValidationResult):void{this.passwordError=result.message;}
 /** Validates both fields and emits credentials when locally valid. */ onSubmit(event:SubmitEvent):void{event.preventDefault();this.emailValidator.validateNow();this.passwordValidator.validateNow();if(this.emailError||this.passwordError)return;this.loginRequested.emit({email:this.email.trim(),password:this.password});}
 /** Clears the form and resets the validation directives. */ onCancel():void{this.email='';this.password='';this.emailError='';this.passwordError='';this.emailValidator.reset();this.passwordValidator.reset();}
}
