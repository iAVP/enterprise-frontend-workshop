import { TransactionType } from './enums';

describe('shared definitions', () => {
	test('exposes the signed transaction type values', () => {
		expect(TransactionType.income).toBe(1);
		expect(TransactionType.expense).toBe(-1);
	});
});
