/**
 * API Service
 * Handles all HTTP requests to the backend
 */

import { API_BASE_URL, API_ENDPOINTS } from '../constants/index.ts';
import type { Product, User, LoginCredentials, RegisterData, ApiResponse } from '../types/index.ts';

/**
 * Generic fetch wrapper with error handling
 */
const fetchWithErrorHandling = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Fetches all products from the API
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetchWithErrorHandling<ApiResponse<Product[]>>(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch products');
  }
  
  return response.data;
};

/**
 * Fetches a single product by ID from the API
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetchWithErrorHandling<ApiResponse<Product>>(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch product');
  }
  
  return response.data;
};

/**
 * User login - calls backend API
 */
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchWithErrorHandling<ApiResponse<User>>(
    `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
    {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Login failed');
  }
  
  return response.data;
};

/**
 * User registration - calls backend API
 */
export const registerUser = async (data: RegisterData): Promise<User> => {
  // Remove confirmPassword before sending to backend
  const { confirmPassword, ...registrationData } = data;
  
  const response = await fetchWithErrorHandling<ApiResponse<User>>(
    `${API_BASE_URL}${API_ENDPOINTS.REGISTER}`,
    {
      method: 'POST',
      body: JSON.stringify(registrationData),
    }
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Registration failed');
  }
  
  return response.data;
};
