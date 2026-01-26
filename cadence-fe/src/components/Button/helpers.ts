/**
 * Button Component Helper Functions
 */

import type { ButtonVariant, ButtonSize } from './types.ts';
import { DEFAULT_VARIANT, DEFAULT_SIZE } from './constants.ts';

/**
 * Validates and returns valid button variant
 */
export const getValidVariant = (variant?: string): ButtonVariant => {
  const validVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'danger'];
  if (variant && validVariants.includes(variant as ButtonVariant)) {
    return variant as ButtonVariant;
  }
  return DEFAULT_VARIANT;
};

/**
 * Validates and returns valid button size
 */
export const getValidSize = (size?: string): ButtonSize => {
  const validSizes: ButtonSize[] = ['small', 'medium', 'large'];
  if (size && validSizes.includes(size as ButtonSize)) {
    return size as ButtonSize;
  }
  return DEFAULT_SIZE;
};
