/**
 * Input Component Types
 */

import type { InputHTMLAttributes } from 'react';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: InputType;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}
