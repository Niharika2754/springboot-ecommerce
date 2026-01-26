/**
 * ProductCard Component Types
 */

import type { Product } from '../../types/index.ts';

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}
