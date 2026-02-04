/**
 * ProductCard Component - Displays individual product information
 */

import type { ProductCardProps } from './types.ts';
import { formatPrice } from '../../utils/index.ts';
import { truncateText } from './helpers.ts';
import { API_BASE_URL } from '../../constants/index.ts';
import './styles.ts';
import { useState } from 'react';

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = `${API_BASE_URL}/api/products/${product.id}/image`;

  const handleImageError = () => {
    console.log(`Failed to load image for product ${product.id}`);
    setImageError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card__image">
        {!imageError ? (
          <img 
            src={imageUrl} 
            alt={product.name}
            onError={handleImageError}
          />
        ) : (
          <div className="product-card__placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="product-card__content">
        <div className="product-card__header">
          <h3 className="product-card__title">
            {truncateText(product.name, 50)}
          </h3>
          <span className="product-card__brand">{product.brand}</span>
        </div>
        
        <p className="product-card__description">
          {truncateText(product.desc, 100)}
        </p>
        
        <p className="product-card__category">
          {product.category}
        </p>
        
        <div className="product-card__footer">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          
          <div className="product-card__meta">
            <span className="product-card__quality">
              Quality: {product.quality}%
            </span>
            <span className={`product-card__status ${product.available ? 'available' : 'unavailable'}`}>
              {product.available ? '✓ Available' : '✗ Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
