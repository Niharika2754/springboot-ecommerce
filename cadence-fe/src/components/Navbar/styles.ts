/**
 * Navbar Component Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, SHADOWS } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .navbar {
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border-bottom: 1px solid ${COLORS.BORDER_LIGHT};
    box-shadow: ${SHADOWS.SM};
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .navbar__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: ${SPACING.LG} ${SPACING.XL};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar__brand {
    display: flex;
    align-items: center;
    gap: ${SPACING.MD};
    cursor: pointer;
    user-select: none;
  }

  .navbar__logo {
    font-size: ${FONT_SIZES.XXL};
  }

  .navbar__title {
    font-size: ${FONT_SIZES.XL};
    font-weight: ${FONT_WEIGHTS.BOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .navbar__actions {
    display: flex;
    align-items: center;
    gap: ${SPACING.MD};
  }

  .navbar__user {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.TEXT_SECONDARY};
    margin-right: ${SPACING.SM};
  }
`;

document.head.appendChild(styles);

export {};
