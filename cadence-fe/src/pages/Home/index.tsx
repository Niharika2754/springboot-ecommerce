/**
 * Home Page - Product listing
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/index.tsx';
import ProductCard from '../../components/ProductCard/index.tsx';
import { fetchProducts } from '../../services/api.ts';
import type { Product } from '../../types/index.ts';
import { ROUTES } from '../../constants/index.ts';
import Button from '../../components/Button/index.tsx';
import './styles.ts';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="home-page">
      <Navbar />
      
      <div className="home-page__container">
        <div className="home-page__header">
          <h1 className="home-page__title">Featured Products</h1>
          <Button 
            variant="primary" 
            onClick={() => navigate('/add-product')}
            className="home-page__add-product-button"
          >
            + Add Product
          </Button>
        </div>

        {isLoading && (
          <div className="home-page__loading">
            <div className="home-page__spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="home-page__error">
            <p>{error}</p>
            <button onClick={loadProducts} className="home-page__retry-button">
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="home-page__grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="home-page__empty">
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
