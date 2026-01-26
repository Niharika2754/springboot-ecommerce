/**
 * Register Page Helper Functions
 */

/**
 * Checks if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
