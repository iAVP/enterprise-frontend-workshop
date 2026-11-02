/** Contains credentials emitted after successful local login form validation. */
export interface LoginCredentials {
  /** Stores the email address entered by the user. */
  email: string;
  /** Stores the password entered by the user. */
  password: string;
}
