/**
 * Theme Constants
 * Design system colors, spacing, and typography
 */

export const COLORS = {
  // Primary palette
  PRIMARY: '#2563EB',
  PRIMARY_HOVER: '#1D4ED8',
  PRIMARY_LIGHT: '#DBEAFE',
  
  // Secondary palette
  SECONDARY: '#10B981',
  SECONDARY_HOVER: '#059669',
  SECONDARY_LIGHT: '#D1FAE5',
  
  // Neutral palette
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
  
  // Semantic colors
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
  
  // Text colors
  TEXT_PRIMARY: '#111827',
  TEXT_SECONDARY: '#6B7280',
  TEXT_LIGHT: '#9CA3AF',
  TEXT_WHITE: '#FFFFFF',
  
  // Background colors
  BACKGROUND_PRIMARY: '#FFFFFF',
  BACKGROUND_SECONDARY: '#F9FAFB',
  BACKGROUND_DARK: '#111827',
  
  // Border colors
  BORDER_LIGHT: '#E5E7EB',
  BORDER_MEDIUM: '#D1D5DB',
  BORDER_DARK: '#9CA3AF',
} as const;

export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
  XL: '32px',
  XXL: '48px',
} as const;

export const FONT_SIZES = {
  XS: '12px',
  SM: '14px',
  BASE: '16px',
  LG: '18px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
} as const;

export const FONT_WEIGHTS = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

export const BORDER_RADIUS = {
  SM: '4px',
  MD: '8px',
  LG: '12px',
  XL: '16px',
  FULL: '9999px',
} as const;

export const SHADOWS = {
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
} as const;

export const TRANSITIONS = {
  FAST: '150ms ease-in-out',
  NORMAL: '200ms ease-in-out',
  SLOW: '300ms ease-in-out',
} as const;
