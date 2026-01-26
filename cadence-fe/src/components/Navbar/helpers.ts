/**
 * Navbar Component Helper Functions
 */

/**
 * Gets active route class name
 */
export const getActiveClass = (currentPath: string, targetPath: string): string => {
  return currentPath === targetPath ? 'navbar__link--active' : '';
};
