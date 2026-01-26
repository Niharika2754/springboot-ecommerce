/**
 * Validation Utility Functions
 */

import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../constants/index.ts';
import type { LoginFormState, RegisterFormState, FormErrors } from '../types/index.ts';

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email.trim());
};

/**
 * Validates password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
};

/**
 * Validates login form
 */
export const validateLoginForm = (formData: LoginFormState): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.email) {
    errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(formData.email)) {
    errors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  }

  return errors;
};

/**
 * Validates registration form
 */
export const validateRegisterForm = (formData: RegisterFormState): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.name) {
    errors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
  } else if (formData.name.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_MIN_LENGTH;
  }

  if (!formData.email) {
    errors.email = VALIDATION_MESSAGES.EMAIL_REQUIRED;
  } else if (!isValidEmail(formData.email)) {
    errors.email = VALIDATION_MESSAGES.EMAIL_INVALID;
  }

  if (!formData.username) {
    errors.username = VALIDATION_MESSAGES.USERNAME_REQUIRED;
  } else if (formData.username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH) {
    errors.username = VALIDATION_MESSAGES.USERNAME_MIN_LENGTH;
  } else if (!VALIDATION_RULES.USERNAME_REGEX.test(formData.username)) {
    errors.username = VALIDATION_MESSAGES.USERNAME_INVALID;
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  } else if (!isValidPassword(formData.password)) {
    errors.password = VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_MISMATCH;
  }

  return errors;
};
