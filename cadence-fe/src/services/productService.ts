/**
 * Product Service
 * Handles all product-related API calls; sends JWT when present for mutations
 */

import { getTokenFromStorage } from '../utils/index.ts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface Product {
  id: number;
  name: string;
  desc: string;
  brand: string;
  price: number;
  category: string;
  releaseDate: string;
  available: boolean;
  quality: number;
}

const authHeaders = (): HeadersInit => {
  const token = getTokenFromStorage();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const fetchWithErrorHandling = async <T,>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: { ...authHeaders(), ...(options?.headers as Record<string, string>) },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetchWithErrorHandling<ApiResponse<Product>>(
    `${API_BASE_URL}/products/${id}`
  );
  
  if (!response.success) {
    throw new Error(response.message || 'Failed to fetch product');
  }
  
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
