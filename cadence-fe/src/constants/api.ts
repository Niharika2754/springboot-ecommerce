/**
 * API Configuration Constants
 */

export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_CATEGORIES: '/products/categories',
  USERS: '/api/users',
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  CART: '/carts',
} as const;

export const API_TIMEOUT = 10000;
