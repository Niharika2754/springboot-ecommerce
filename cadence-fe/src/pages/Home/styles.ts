/**
 * Home Page Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, BORDER_RADIUS } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .home-page {
    min-height: 100vh;
    background-color: ${COLORS.BACKGROUND_SECONDARY};
  }

  .home-page__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: ${SPACING.XXL} ${SPACING.XL};
  }

  .home-page__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${SPACING.XL};
    flex-wrap: wrap;
    gap: ${SPACING.MD};
  }

  .home-page__title {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0;
    flex: 1;
  }

  .home-page__subtitle {
    font-size: ${FONT_SIZES.LG};
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }

  .home-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${SPACING.XL};
  }

  .home-page__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${SPACING.XXL};
    gap: ${SPACING.LG};
  }

  .home-page__spinner {
    width: 48px;
    height: 48px;
    border: 4px solid ${COLORS.GRAY_200};
    border-top-color: ${COLORS.PRIMARY};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .home-page__loading p {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }

  .home-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${SPACING.XXL};
    gap: ${SPACING.LG};
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border-radius: ${BORDER_RADIUS.LG};
  }

  .home-page__error p {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.ERROR};
    margin: 0;
  }

  .home-page__retry-button {
    padding: ${SPACING.MD} ${SPACING.XL};
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.TEXT_WHITE};
    border: none;
    border-radius: ${BORDER_RADIUS.MD};
    font-size: ${FONT_SIZES.BASE};
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .home-page__retry-button:hover {
    background-color: ${COLORS.PRIMARY_HOVER};
  }

  .home-page__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${SPACING.XXL};
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border-radius: ${BORDER_RADIUS.LG};
  }

  .home-page__empty p {
    font-size: ${FONT_SIZES.LG};
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }

  @media (max-width: 768px) {
    .home-page__header {
      flex-direction: column;
      align-items: flex-start;
      gap: ${SPACING.MD};
    }
  }
`;

document.head.appendChild(styles);

export {};
