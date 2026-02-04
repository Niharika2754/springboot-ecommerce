/**
 * AddProduct Page Component
 * Form for adding new products
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/index.tsx';
import { ROUTES, API_BASE_URL } from '../../constants/index.ts';
import { useAuth } from '../../hooks/useAuth.tsx';
import { getTokenFromStorage } from '../../utils/index.ts';
import './styles.ts';

interface ProductFormData {
  name: string;
  brand: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  releaseDate: string;
  available: boolean;
  image: File | null;
}

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    releaseDate: '',
    available: true,
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [user, navigate]);

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
      if (formData.image) {
        // Send with image using multipart/form-data
        const formDataToSend = new FormData();
        
        const productData = {
          name: formData.name,
          brand: formData.brand,
          desc: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          releaseDate: formData.releaseDate,
          available: formData.available,
          quality: 95
        };

        formDataToSend.append('product', new Blob([JSON.stringify(productData)], {
          type: 'application/json'
        }));
        formDataToSend.append('image', formData.image);
        
        const token = getTokenFromStorage();
        const response = await fetch(`${API_BASE_URL}/api/product/with-image`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formDataToSend,
        });

        if (!response.ok) {
          throw new Error('Failed to add product');
        }
      } else {
        // Send without image using JSON
        const productData = {
          name: formData.name,
          brand: formData.brand,
          desc: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          releaseDate: formData.releaseDate,
          available: formData.available,
          quality: 95
        };
        
        const token = getTokenFromStorage();
        const response = await fetch(`${API_BASE_URL}/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          throw new Error('Failed to add product');
        }
      }
      
      // Navigate back to products list on success
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-page__container">
        <div className="add-product-page__header">
          <h1 className="add-product-page__title">Add New Product</h1>
        </div>

        {error && (
          <div className="add-product-page__error">
            {error}
          </div>
        )}

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="add-product-form__row">
            <div className="add-product-form__field">
              <label className="add-product-form__label">Name</label>
              <input
                type="text"
                name="name"
                className="add-product-form__input"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="add-product-form__field">
              <label className="add-product-form__label">Brand</label>
              <input
                type="text"
                name="brand"
                className="add-product-form__input"
                placeholder="Enter your Brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="add-product-form__field add-product-form__field--full">
            <label className="add-product-form__label">Description</label>
            <textarea
              name="description"
              className="add-product-form__textarea"
              placeholder="Add product description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="add-product-form__row">
            <div className="add-product-form__field">
              <label className="add-product-form__label">Price</label>
              <input
                type="number"
                name="price"
                className="add-product-form__input"
                placeholder="Eg: $1000"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="add-product-form__field">
              <label className="add-product-form__label">Category</label>
              <select
                name="category"
                className="add-product-form__select"
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

          <div className="add-product-form__row">
            <div className="add-product-form__field">
              <label className="add-product-form__label">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                className="add-product-form__input"
                placeholder="Stock Remaining"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            <div className="add-product-form__field">
              <label className="add-product-form__label">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                className="add-product-form__input add-product-form__input--date"
                value={formData.releaseDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="add-product-form__field">
              <label className="add-product-form__label">Image</label>
              <input
                type="file"
                name="image"
                className="add-product-form__input add-product-form__input--file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="add-product-form__checkbox">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="available" className="add-product-form__checkbox-label">
              Product Available
            </label>
          </div>

          <div className="add-product-form__actions">
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
