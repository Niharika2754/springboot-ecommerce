/**
 * ProductCard Component Helper Functions
 */

import { MAX_TITLE_LENGTH } from './constants.ts';

/**
 * Truncates text to specified length
 */
export const truncateText = (text: string, maxLength: number = MAX_TITLE_LENGTH): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formats rating for display
 */
export const formatRating = (rate: number): string => {
  return rate.toFixed(1);
};
