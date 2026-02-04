/**
 * API Service
 * Handles all HTTP requests to the backend
 */

import { API_BASE_URL, API_ENDPOINTS } from '../constants/index.ts';
import type { Product, User, LoginCredentials, RegisterData, ApiResponse, AuthResponse } from '../types/index.ts';
import { getTokenFromStorage } from '../utils/index.ts';

/**
 * Generic fetch wrapper with error handling; attaches JWT when present
 */
const fetchWithErrorHandling = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = getTokenFromStorage();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(url, {
      ...options,
      headers,
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
 * User login - backend returns { token, user }
 */
export const loginUser = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  const response = await fetchWithErrorHandling<ApiResponse<AuthResponse>>(
    `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
    {
      method: 'POST',
      body: JSON.stringify({ username: credentials.email, password: credentials.password }),
    }
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Login failed');
  }
  
  return response.data;
};

/**
 * User registration - backend returns { token, user } (same shape as login for consistency)
 */
export const registerUser = async (data: RegisterData): Promise<{ token: string; user: User }> => {
  const { confirmPassword, ...registrationData } = data;
  
  const response = await fetchWithErrorHandling<ApiResponse<AuthResponse>>(
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

/**
 * Deletes a product by ID
 */
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetchWithErrorHandling<ApiResponse<null>>(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`,
    {
      method: 'DELETE',
    }
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Failed to delete product');
  }
};
