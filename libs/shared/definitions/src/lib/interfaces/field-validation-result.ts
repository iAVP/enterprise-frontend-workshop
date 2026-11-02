/** Describes the result returned by a reusable field validator. */
export interface FieldValidationResult {
	/**
	 * is the field valid?
	 */
	valid: boolean;
	/**
	 * some message of zthe validation result (errors etc.)
	 */
	message: string;
}
