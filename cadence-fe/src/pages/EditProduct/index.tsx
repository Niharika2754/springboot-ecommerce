/**
 * EditProduct Page Component
 * Form for editing existing products
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/index.tsx';
import { ROUTES, API_BASE_URL } from '../../constants/index.ts';
import { useAuth } from '../../hooks/useAuth.tsx';
import { fetchProductById } from '../../services/productService';
import { getTokenFromStorage } from '../../utils/index.ts';
import './styles.ts';

interface ProductFormData {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  releaseDate: string;
  available: boolean;
  quality: string;
  image: File | null;
}

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    releaseDate: '',
    available: true,
    quality: '95',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoadingProduct(true);
        const product = await fetchProductById(Number(id));
        
        setFormData({
          name: product.name,
          brand: product.brand,
          description: product.desc,
          price: product.price.toString(),
          category: product.category,
          releaseDate: product.releaseDate,
          available: product.available,
          quality: product.quality.toString(),
          image: null
        });
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, available: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        desc: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        releaseDate: formData.releaseDate,
        available: formData.available,
        quality: parseInt(formData.quality)
      };

      console.log('Updating product with data:', productData);

      if (formData.image) {
        // Update with new image
        const formDataToSend = new FormData();
        formDataToSend.append('product', new Blob([JSON.stringify(productData)], {
          type: 'application/json'
        }));
        formDataToSend.append('image', formData.image);
        
        const token = getTokenFromStorage();
        const response = await fetch(`${API_BASE_URL}/api/products/${id}/with-image`, {
          method: 'PUT',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Server error:', errorData);
          throw new Error(errorData.message || 'Failed to update product');
        }
      } else {
        // Update without changing image
        const token = getTokenFromStorage();
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Server error:', errorData);
          throw new Error(errorData.message || 'Failed to update product');
        }
      }
      
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="edit-product-page">
        <div className="edit-product-page__container">
          <div className="edit-product-page__loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <div className="edit-product-page__container">
        <div className="edit-product-page__header">
          <h1 className="edit-product-page__title">Edit Product</h1>
        </div>

        {error && (
          <div className="edit-product-page__error">
            {error}
          </div>
        )}

        <form className="edit-product-form" onSubmit={handleSubmit}>
          <div className="edit-product-form__row">
            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Name</label>
              <input
                type="text"
                name="name"
                className="edit-product-form__input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Brand</label>
              <input
                type="text"
                name="brand"
                className="edit-product-form__input"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="edit-product-form__field edit-product-form__field--full">
            <label className="edit-product-form__label">Description</label>
            <textarea
              name="description"
              className="edit-product-form__textarea"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="edit-product-form__row">
            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Price</label>
              <input
                type="number"
                name="price"
                className="edit-product-form__input"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Category</label>
              <select
                name="category"
                className="edit-product-form__select"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>
          </div>

          <div className="edit-product-form__row">
            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Quality</label>
              <input
                type="number"
                name="quality"
                className="edit-product-form__input"
                value={formData.quality}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
            </div>

            <div className="edit-product-form__field">
              <label className="edit-product-form__label">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                className="edit-product-form__input"
                value={formData.releaseDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="edit-product-form__field">
              <label className="edit-product-form__label">New Image (optional)</label>
              <input
                type="file"
                name="image"
                className="edit-product-form__input"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="edit-product-form__checkbox">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="available" className="edit-product-form__checkbox-label">
              Product Available
            </label>
          </div>

          <div className="edit-product-form__actions">
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
