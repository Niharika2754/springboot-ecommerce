/**
 * Add Product Page Styles
 */

import { injectGlobal } from '@emotion/css';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme.ts';

injectGlobal`
  .add-product-page {
    min-height: 100vh;
    background-color: #f9f9f9;
    padding: ${SPACING.XL} 0;
  }

  .add-product-page__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${SPACING.LG};
  }

  .add-product-page__header {
    margin-bottom: ${SPACING.XL};
  }

  .add-product-page__title {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
  }

  .add-product-page__error {
    background-color: rgba(220, 38, 38, 0.1);
    border: 1px solid ${COLORS.ERROR};
    color: ${COLORS.ERROR};
    padding: ${SPACING.MD};
    border-radius: 8px;
    margin-bottom: ${SPACING.LG};
  }

  .add-product-form {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.LG};
  }

  .add-product-form__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${SPACING.LG};
  }

  .add-product-form__field {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.SM};
  }

  .add-product-form__field--full {
    grid-column: 1 / -1;
  }

  .add-product-form__label {
    font-size: ${FONT_SIZES.BASE};
    font-weight: ${FONT_WEIGHTS.MEDIUM};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .add-product-form__input,
  .add-product-form__textarea,
  .add-product-form__select {
    padding: ${SPACING.MD};
    font-size: ${FONT_SIZES.BASE};
    border: 2px solid transparent;
    border-radius: 8px;
    background-color: #d7d5d5;
    color: #1a1a1a;
    transition: all 0.2s;
  }

  .add-product-form__input::placeholder,
  .add-product-form__textarea::placeholder {
    color: #9ca3af;
  }

  .add-product-form__input:focus,
  .add-product-form__textarea:focus,
  .add-product-form__select:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
  }

  .add-product-form__textarea {
    resize: vertical;
    min-height: 100px;
  }

  .add-product-form__select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231a1a1a' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right ${SPACING.MD} center;
    padding-right: ${SPACING.XL};
  }

  .add-product-form__input--date {
    color-scheme: light;
  }

  .add-product-form__input--file {
    padding: ${SPACING.SM};
    cursor: pointer;
  }

  .add-product-form__checkbox {
    display: flex;
    align-items: center;
    gap: ${SPACING.SM};
    margin-top: ${SPACING.MD};
  }

  .add-product-form__checkbox input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: ${COLORS.PRIMARY};
  }

  .add-product-form__checkbox-label {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.TEXT_PRIMARY};
    cursor: pointer;
  }

  .add-product-form__actions {
    margin-top: ${SPACING.LG};
  }

  .add-product-form__actions button {
    min-width: 200px;
  }

  @media (max-width: 768px) {
    .add-product-form__row {
      grid-template-columns: 1fr;
    }

    .add-product-page__container {
      padding: 0 ${SPACING.MD};
    }
  }
`;
