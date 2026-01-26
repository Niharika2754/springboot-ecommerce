/**
 * Register Page Constants
 */

import type { RegisterFormState } from './types.ts';

export const REGISTER_FORM_INITIAL_STATE: RegisterFormState = {
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};
