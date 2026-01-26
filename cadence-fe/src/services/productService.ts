/**
 * Product Service
 * Handles all product-related API calls
 */

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

const fetchWithErrorHandling = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
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
