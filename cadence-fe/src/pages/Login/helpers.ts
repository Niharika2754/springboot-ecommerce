/**
 * Login Page Helper Functions
 */

/**
 * Sanitizes email input
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};
