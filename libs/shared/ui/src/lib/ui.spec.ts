import { EmailValidatorDirective, PasswordValidatorDirective } from './directives';

describe('shared UI', () => {
	test('exports the shared validation directives', () => {
		expect(EmailValidatorDirective).toBeDefined();
		expect(PasswordValidatorDirective).toBeDefined();
	});
});
