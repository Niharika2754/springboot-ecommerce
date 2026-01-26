/**
 * Input Component - Reusable form input with validation
 */

import type { InputProps } from './types.ts';
import './styles.ts';

const Input = ({
  type = 'text',
  label,
  error,
  helperText,
  fullWidth = false,
  required = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  className = '',
}: InputProps) => {
  const wrapperClass = `input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''}`;
  const inputClass = `input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''} ${className}`;
  const labelClass = `input__label ${required ? 'input__label--required' : ''}`;

  const inputId = id || name;

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      
      <input
        type={type}
        id={inputId}
        name={name}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
      />
      
      {error && <span className="input__error">{error}</span>}
      {!error && helperText && <span className="input__helper">{helperText}</span>}
    </div>
  );
};

export default Input;
