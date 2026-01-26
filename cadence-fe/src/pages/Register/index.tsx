/**
 * Register Page - User registration
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import Input from '../../components/Input/index.tsx';
import Button from '../../components/Button/index.tsx';
import { ROUTES, VALIDATION_MESSAGES } from '../../constants/index.ts';
import { validateRegisterForm } from '../../utils/index.ts';
import type { RegisterFormState } from './types.ts';
import { REGISTER_FORM_INITIAL_STATE } from './constants.ts';
import './styles.ts';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterFormState>(REGISTER_FORM_INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const handleInputChange = (field: keyof RegisterFormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setApiError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');
      await register(formData);
      navigate(ROUTES.HOME);
    } catch (error) {
      setApiError(VALIDATION_MESSAGES.REGISTER_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        <div className="register-page__card">
          <div className="register-page__header">
            <h1 className="register-page__title">Create Account</h1>
            <p className="register-page__subtitle">Join us today</p>
          </div>

          {apiError && (
            <div className="register-page__error">{apiError}</div>
          )}

          <form onSubmit={handleSubmit} className="register-page__form">
            <Input
              type="text"
              label="Name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={errors.name}
              required
              fullWidth
            />

            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              required
              fullWidth
            />

            <Input
              type="text"
              label="Username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange('username')}
              error={errors.username}
              required
              fullWidth
            />

            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              required
              fullWidth
            />

            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="register-page__footer">
            <p className="register-page__footer-text">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="register-page__link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
