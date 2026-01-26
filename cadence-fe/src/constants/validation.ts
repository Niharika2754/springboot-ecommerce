/**
 * Validation Constants and Messages
 */

export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
} as const;

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters`,
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_MIN_LENGTH: `Username must be at least ${VALIDATION_RULES.MIN_USERNAME_LENGTH} characters`,
  USERNAME_INVALID: 'Username can only contain letters, numbers, and underscores',
  
  LOGIN_FAILED: 'Invalid email or password',
  REGISTER_FAILED: 'Registration failed. Email or username may already be in use',
  GENERIC_ERROR: 'An error occurred. Please try again',
} as const;
