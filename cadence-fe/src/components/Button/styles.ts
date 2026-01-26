/**
 * Button Component Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, TRANSITIONS, SPACING } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    transition: all ${TRANSITIONS.NORMAL};
    outline: none;
    text-decoration: none;
  }

  .button:focus-visible {
    outline: 2px solid ${COLORS.PRIMARY};
    outline-offset: 2px;
  }

  /* Variants */
  .button--primary {
    background-color: ${COLORS.PRIMARY};
    color: ${COLORS.TEXT_WHITE};
  }

  .button--primary:hover:not(.button--disabled) {
    background-color: ${COLORS.PRIMARY_HOVER};
    transform: translateY(-1px);
  }

  .button--secondary {
    background-color: ${COLORS.GRAY_100};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .button--secondary:hover:not(.button--disabled) {
    background-color: ${COLORS.GRAY_200};
  }

  .button--outline {
    background-color: transparent;
    color: ${COLORS.PRIMARY};
    border: 2px solid ${COLORS.PRIMARY};
  }

  .button--outline:hover:not(.button--disabled) {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }

  .button--danger {
    background-color: ${COLORS.ERROR};
    color: ${COLORS.TEXT_WHITE};
  }

  .button--danger:hover:not(.button--disabled) {
    background-color: #DC2626;
  }

  /* Sizes */
  .button--small {
    padding: ${SPACING.SM} ${SPACING.MD};
    font-size: ${FONT_SIZES.SM};
    border-radius: ${BORDER_RADIUS.SM};
  }

  .button--medium {
    padding: ${SPACING.MD} ${SPACING.LG};
    font-size: ${FONT_SIZES.BASE};
    border-radius: ${BORDER_RADIUS.MD};
  }

  .button--large {
    padding: ${SPACING.LG} ${SPACING.XL};
    font-size: ${FONT_SIZES.LG};
    border-radius: ${BORDER_RADIUS.LG};
  }

  /* States */
  .button--full-width {
    width: 100%;
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button--disabled:hover {
    transform: none;
  }
`;

document.head.appendChild(styles);

export {};
