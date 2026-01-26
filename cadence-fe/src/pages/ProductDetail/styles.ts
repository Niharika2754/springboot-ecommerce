/**
 * Product Detail Page Styles
 */

import { injectGlobal } from '@emotion/css';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme.ts';

injectGlobal`
  .product-detail-page {
    min-height: 100vh;
    background-color: ${COLORS.BACKGROUND_PRIMARY};
  }

  .product-detail-page__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: ${SPACING.XL} ${SPACING.LG};
  }

  .product-detail-page__loading,
  .product-detail-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: ${SPACING.MD};
  }

  .product-detail-page__spinner {
    width: 50px;
    height: 50px;
    border: 4px solid ${COLORS.BACKGROUND_SECONDARY};
    border-top-color: ${COLORS.PRIMARY};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .product-detail-page__error p {
    color: ${COLORS.ERROR};
    font-size: ${FONT_SIZES.LG};
  }

  .product-detail-page__header {
    margin-bottom: ${SPACING.XL};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${SPACING.MD};
  }

  .product-detail-page__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${SPACING.XXL};
    margin-top: ${SPACING.XL};
    background-color: ${COLORS.BACKGROUND_SECONDARY};
    border-radius: 12px;
    padding: ${SPACING.XL};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .product-detail-page__image-container {
    width: 100%;
    height: 500px;
    background-color: #f5f5f5;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-detail-page__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-detail-page__image-placeholder {
    color: #9ca3af;
    font-size: ${FONT_SIZES.LG};
    text-align: center;
  }

  .product-detail-page__main {
    display: grid;
    gap: ${SPACING.XL};
  }

  .product-detail-page__info {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.LG};
  }

  .product-detail-page__title-section {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.XS};
  }

  .product-detail-page__title {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
  }

  .product-detail-page__brand {
    font-size: ${FONT_SIZES.LG};
    color: ${COLORS.TEXT_SECONDARY};
    font-weight: ${FONT_WEIGHTS.MEDIUM};
  }

  .product-detail-page__description {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.TEXT_SECONDARY};
    line-height: 1.6;
  }

  .product-detail-page__meta {
    display: grid;
    gap: ${SPACING.MD};
    padding: ${SPACING.LG};
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border-radius: 8px;
  }

  .product-detail-page__meta-item {
    display: flex;
    gap: ${SPACING.SM};
  }

  .product-detail-page__meta-label {
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    min-width: 120px;
  }

  .product-detail-page__meta-value {
    color: ${COLORS.TEXT_SECONDARY};
  }

  .product-detail-page__status {
    font-weight: ${FONT_WEIGHTS.MEDIUM};
  }
  
  .product-detail-page__status.available {
    color: ${COLORS.SUCCESS};
  }
  
  .product-detail-page__status.unavailable {
    color: ${COLORS.ERROR};
  }

  .product-detail-page__purchase {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.LG};
    padding-top: ${SPACING.LG};
    border-top: 1px solid ${COLORS.BORDER_LIGHT};
  }

  .product-detail-page__price {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.PRIMARY};
  }

  @media (max-width: 768px) {
    .product-detail-page__container {
      padding: ${SPACING.MD};
    }

    .product-detail-page__content {
      grid-template-columns: 1fr;
      padding: ${SPACING.LG};
    }

    .product-detail-page__title {
      font-size: ${FONT_SIZES.XXL};
    }

    .product-detail-page__price {
      font-size: ${FONT_SIZES.XXL};
    }

    .product-detail-page__image-container {
      height: 300px;
    }
  }
`;
