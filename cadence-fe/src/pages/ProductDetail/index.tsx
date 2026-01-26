/**
 * ProductDetail Page Component
 * Displays detailed information about a specific product
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../constants/index.ts';
import Button from '../../components/Button/index.tsx';
import { fetchProductById, deleteProduct } from '../../services/productService';
import './styles.ts';

interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  description: string;
  category?: string;
  stock?: number;
  available?: boolean;
  quality?: number;
  releaseDate?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchProductById(Number(id));
        
        // Map API response to component's Product interface
        setProduct({
          id: data.id.toString(),
          name: data.name,
          brand: data.brand,
          price: data.price,
          description: data.desc,
          category: data.category,
          stock: data.available ? 10 : 0,
          available: data.available,
          quality: data.quality,
          releaseDate: data.releaseDate
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteProduct(Number(id));
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  if (loading) {
    return (
      <div className="product-detail-page">

        <div className="product-detail-page__container">
          <div className="product-detail-page__loading">
            <div className="product-detail-page__spinner" />
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-page__container">
          <div className="product-detail-page__error">
            <p>{error || 'Product not found'}</p>
            <Button variant="primary" onClick={() => navigate(ROUTES.HOME)}>
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = `/api/products/${id}/image`;

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__container">
        <div className="product-detail-page__header">
          <Button variant="secondary" onClick={() => navigate(ROUTES.HOME)}>
            ← Back to Products
          </Button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" onClick={handleEdit}>
              Edit Product
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Product'}
            </Button>
          </div>
        </div>

        <div className="product-detail-page__content">
          <div className="product-detail-page__image-container">
            {!imageError ? (
              <img 
                src={imageUrl} 
                alt={product.name}
                className="product-detail-page__image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="product-detail-page__image-placeholder">
                No Image Available
              </div>
            )}
          </div>

          <div className="product-detail-page__main">
            <div className="product-detail-page__info">
              <div className="product-detail-page__title-section">
                <h1 className="product-detail-page__title">{product.name}</h1>
                {product.brand && (
                  <p className="product-detail-page__brand">{product.brand}</p>
                )}
              </div>

              <p className="product-detail-page__description">
                {product.description}
              </p>

              <div className="product-detail-page__meta">
                {product.category && (
                  <div className="product-detail-page__meta-item">
                    <span className="product-detail-page__meta-label">Category:</span>
                    <span className="product-detail-page__meta-value">{product.category}</span>
                  </div>
                )}
                <div className="product-detail-page__meta-item">
                  <span className="product-detail-page__meta-label">Product ID:</span>
                  <span className="product-detail-page__meta-value">{product.id}</span>
                </div>
                <div className="product-detail-page__meta-item">
                  <span className="product-detail-page__meta-label">Availability:</span>
                  <span className={`product-detail-page__meta-value product-detail-page__status ${
                    (product.stock ?? 0) > 0 ? 'available' : 'unavailable'
                  }`}>
                    {(product.stock ?? 0) > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="product-detail-page__purchase">
                <div className="product-detail-page__price">
                  ${product.price.toFixed(2)}
                </div>
                <Button 
                  variant="primary" 
                  size="large"
                  disabled={(product.stock ?? 0) === 0}
                >
                  {(product.stock ?? 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;