/**
 * Register Page Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SPACING, SHADOWS } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .register-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${COLORS.SECONDARY_LIGHT} 0%, ${COLORS.PRIMARY_LIGHT} 100%);
    padding: ${SPACING.XL};
  }

  .register-page__container {
    width: 100%;
    max-width: 450px;
  }

  .register-page__card {
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border-radius: ${BORDER_RADIUS.XL};
    box-shadow: ${SHADOWS.XL};
    padding: ${SPACING.XXL};
  }

  .register-page__header {
    text-align: center;
    margin-bottom: ${SPACING.XL};
  }

  .register-page__title {
    font-size: ${FONT_SIZES.XXXL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
    margin: 0 0 ${SPACING.SM} 0;
  }

  .register-page__subtitle {
    font-size: ${FONT_SIZES.BASE};
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }

  .register-page__error {
    background-color: rgba(239, 68, 68, 0.1);
    color: ${COLORS.ERROR};
    padding: ${SPACING.MD};
    border-radius: ${BORDER_RADIUS.MD};
    margin-bottom: ${SPACING.LG};
    font-size: ${FONT_SIZES.SM};
    text-align: center;
  }

  .register-page__form {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.MD};
  }

  .register-page__footer {
    margin-top: ${SPACING.XL};
    text-align: center;
  }

  .register-page__footer-text {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.TEXT_SECONDARY};
    margin: 0;
  }

  .register-page__link {
    color: ${COLORS.PRIMARY};
    text-decoration: none;
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
  }

  .register-page__link:hover {
    text-decoration: underline;
  }
`;

document.head.appendChild(styles);

export {};
