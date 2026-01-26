/**
 * Home Page Helper Functions
 */

import type { Product } from '../../types/index.ts';

/**
 * Filters products by category
 */
export const filterByCategory = (products: Product[], category: string): Product[] => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter((product) => product.category === category);
};

/**
 * Sorts products by price
 */
export const sortByPrice = (products: Product[], order: 'asc' | 'desc'): Product[] => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
};
