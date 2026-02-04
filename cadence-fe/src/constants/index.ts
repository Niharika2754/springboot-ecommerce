/**
 * Global Constants Export
 * Central export point for all application constants
 */

export * from './api.ts';
export * from './routes.ts';
export * from './theme.ts';
export * from './validation.ts';

export const APP_NAME = 'ECommerce Store';
export const APP_DESCRIPTION = 'Your one-stop shop for all your needs';

export const STORAGE_KEYS = {
  USER: 'ecommerce_user',
  TOKEN: 'ecommerce_token',
  CART: 'ecommerce_cart',
  USERS: 'ecommerce_users',
} as const;

export const ITEMS_PER_PAGE = 12;
export const MAX_CART_ITEMS = 99;
