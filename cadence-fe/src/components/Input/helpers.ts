/**
 * Input Component Helper Functions
 */

import type { InputType } from './types.ts';
import { DEFAULT_TYPE } from './constants.ts';

/**
 * Validates and returns valid input type
 */
export const getValidInputType = (type?: string): InputType => {
  const validTypes: InputType[] = ['text', 'email', 'password', 'number', 'tel', 'url'];
  if (type && validTypes.includes(type as InputType)) {
    return type as InputType;
  }
  return DEFAULT_TYPE;
};

/**
 * Gets autocomplete attribute based on input type
 */
export const getAutocompleteValue = (type: InputType): string => {
  switch (type) {
    case 'email':
      return 'email';
    case 'password':
      return 'current-password';
    case 'tel':
      return 'tel';
    default:
      return 'off';
  }
};
