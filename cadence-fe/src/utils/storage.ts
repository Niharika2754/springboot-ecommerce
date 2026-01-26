/**
 * LocalStorage Utility Functions
 */

import { STORAGE_KEYS } from '../constants/index.ts';
import type { User } from '../types/index.ts';

/**
 * Gets user from localStorage
 */
export const getUserFromStorage = (): User | null => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error reading user from storage:', error);
    return null;
  }
};

/**
 * Saves user to localStorage
 */
export const saveUserToStorage = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

/**
 * Removes user from localStorage
 */
export const removeUserFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

/**
 * Saves authentication token
 */
export const saveTokenToStorage = (token: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } catch (error) {
    console.error('Error saving token to storage:', error);
  }
};

/**
 * Gets authentication token
 */
export const getTokenFromStorage = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error('Error reading token from storage:', error);
    return null;
  }
};
