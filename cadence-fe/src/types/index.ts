/**
 * Global TypeScript Types and Interfaces
 */

/**
 * API Response wrapper from backend
 */
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

/**
 * User related types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

/**
 * Product related types
 */
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
  imageUrl?: string; // Optional image URL
}

/**
 * Legacy product type for backward compatibility
 */
export interface LegacyProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface ProductRating {
  rate: number;
  count: number;
}

/**
 * Cart related types
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

/**
 * Auth context types
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

/**
 * Form state types
 */
export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
