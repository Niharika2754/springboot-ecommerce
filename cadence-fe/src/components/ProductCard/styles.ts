/**
 * ProductCard Component Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, TRANSITIONS, SPACING, SHADOWS } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .product-card {
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border: 1px solid ${COLORS.BORDER_LIGHT};
    border-radius: ${BORDER_RADIUS.LG};
    overflow: hidden;
    cursor: pointer;
    transition: all ${TRANSITIONS.NORMAL};
    height: 100%;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: ${SHADOWS.LG};
    border-color: ${COLORS.PRIMARY};
  }

  .product-card__image-wrapper {
    width: 100%;
    height: 250px;
    background-color: ${COLORS.GRAY_50};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${SPACING.LG};
    overflow: hidden;
  }

  .product-card__image {
    width: 100%;
    height: 200px;
    background-color: #f5f5f5;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-card__placeholder {
    color: #9ca3af;
    font-size: ${FONT_SIZES.SM};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .product-card__placeholder::before {
    content: '📷';
    font-size: 40px;
  }

  .product-card__content {
    display: flex;
    flex-direction: column;
    padding: ${SPACING.LG};
    flex-grow: 1;
  }

  .product-card__title {
    font-size: ${FONT_SIZES.BASE};
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0 0 ${SPACING.SM} 0;
    line-height: 1.4;
  }

  .product-card__category {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.TEXT_SECONDARY};
    text-transform: capitalize;
    margin: 0 0 ${SPACING.MD} 0;
  }

  .product-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: ${SPACING.MD};
    border-top: 1px solid ${COLORS.BORDER_LIGHT};
  }

  .product-card__price {
    font-size: ${FONT_SIZES.XL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.PRIMARY};
  }

  .product-card__rating {
    display: flex;
    align-items: center;
    gap: ${SPACING.XS};
  }

  .product-card__rating-value {
    font-size: ${FONT_SIZES.SM};
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .product-card__rating-count {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.TEXT_SECONDARY};
  }
`;

document.head.appendChild(styles);

export {};
