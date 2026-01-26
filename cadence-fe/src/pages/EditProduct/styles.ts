/**
 * EditProduct Page Styles
 */

import { injectGlobal } from '@emotion/css';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme.ts';

injectGlobal`
  .edit-product-page {
    min-height: 100vh;
    background-color: #f9f9f9;
    padding: ${SPACING.XL} 0;
  }

  .edit-product-page__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${SPACING.LG};
  }

  .edit-product-page__header {
    margin-bottom: ${SPACING.XL};
  }

  .edit-product-page__title {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
  }

  .edit-product-page__error {
    background-color: rgba(220, 38, 38, 0.1);
    border: 1px solid ${COLORS.ERROR};
    color: ${COLORS.ERROR};
    padding: ${SPACING.MD};
    border-radius: 8px;
    margin-bottom: ${SPACING.LG};
  }

  .edit-product-page__loading {
    text-align: center;
    padding: ${SPACING.XXL};
    font-size: ${FONT_SIZES.LG};
    color: ${COLORS.TEXT_SECONDARY};
  }

  .edit-product-form {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.LG};
  }

  .edit-product-form__row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${SPACING.LG};
  }

  .edit-product-form__field {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.SM};
  }

  .edit-product-form__field--full {
    grid-column: 1 / -1;
  }

  .edit-product-form__label {
    font-size: ${FONT_SIZES.BASE};
    font-weight: ${FONT_WEIGHTS.MEDIUM};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .edit-product-form__input,
  .edit-product-form__textarea,
  .edit-product-form__select {
    padding: ${SPACING.MD};
    font-size: ${FONT_SIZES.BASE};
    border: 2px solid transparent;
    border-radius: 8px;
    background-color: #d7d5d5;
    color: #1a1a1a;
    transition: all 0.2s;
  }

  .edit-product-form__input:focus,
  .edit-product-form__textarea:focus,
  .edit-product-form__select:focus {
    outline: none;
    border-color: ${COLORS.PRIMARY};
  }

  .edit-product-form__textarea {
    resize: vertical;
    min-height: 100px;
  }

  .edit-product-form__select {
    cursor: pointer;
  }

  .edit-product-form__checkbox {
    display: flex;
    align-items: center;
    gap: ${SPACING.SM};
    margin-top: ${SPACING.MD};
  }

  .edit-product-form__checkbox input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: ${COLORS.PRIMARY};
  }

  .edit-product-form__checkbox-label {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.TEXT_PRIMARY};
    cursor: pointer;
  }

  .edit-product-form__actions {
    margin-top: ${SPACING.LG};
    display: flex;
    gap: ${SPACING.MD};
  }

  @media (max-width: 768px) {
    .edit-product-form__row {
      grid-template-columns: 1fr;
    }

    .edit-product-page__container {
      padding: 0 ${SPACING.MD};
    }
  }
`;
