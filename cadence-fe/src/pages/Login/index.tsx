/**
 * Login Page - User authentication
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import Input from '../../components/Input/index.tsx';
import Button from '../../components/Button/index.tsx';
import { ROUTES, VALIDATION_MESSAGES } from '../../constants/index.ts';
import { validateLoginForm } from '../../utils/index.ts';
import type { LoginFormState } from './types.ts';
import { LOGIN_FORM_INITIAL_STATE } from './constants.ts';
import './styles.ts';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormState>(LOGIN_FORM_INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const handleInputChange = (field: keyof LoginFormState) => (
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

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setApiError('');
      await login(formData);
      navigate(ROUTES.HOME);
    } catch (error) {
      setApiError(VALIDATION_MESSAGES.LOGIN_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <div className="login-page__header">
            <h1 className="login-page__title">Welcome Back</h1>
            <p className="login-page__subtitle">Sign in to your account</p>
          </div>

          {apiError && (
            <div className="login-page__error">{apiError}</div>
          )}

          <form onSubmit={handleSubmit} className="login-page__form">
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
              type="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={errors.password}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="login-page__footer">
            <p className="login-page__footer-text">
              Don't have an account?{' '}
              <Link to={ROUTES.REGISTER} className="login-page__link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
