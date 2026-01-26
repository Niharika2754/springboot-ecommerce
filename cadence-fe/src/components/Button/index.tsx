/**
 * Button Component - Reusable button with variants
 */

import type { ButtonProps } from './types.ts';
import './styles.ts';

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  children,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseClass = 'button';
  const variantClass = `button--${variant}`;
  const sizeClass = `button--${size}`;
  const fullWidthClass = fullWidth ? 'button--full-width' : '';
  const disabledClass = disabled ? 'button--disabled' : '';

  const buttonClass = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
