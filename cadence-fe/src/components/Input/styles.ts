/**
 * Input Component Styles
 */

import { COLORS, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, TRANSITIONS, SPACING } from '../../constants/index.ts';

const styles = document.createElement('style');
styles.textContent = `
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: ${SPACING.SM};
    margin-bottom: ${SPACING.MD};
  }

  .input-wrapper--full-width {
    width: 100%;
  }

  .input__label {
    font-size: ${FONT_SIZES.SM};
    font-weight: ${FONT_WEIGHTS.SEMIBOLD};
    color: ${COLORS.TEXT_PRIMARY};
  }

  .input__label--required::after {
    content: ' *';
    color: ${COLORS.ERROR};
  }

  .input {
    padding: ${SPACING.MD};
    font-size: ${FONT_SIZES.BASE};
    font-family: inherit;
    color: ${COLORS.TEXT_PRIMARY};
    background-color: ${COLORS.BACKGROUND_PRIMARY};
    border: 1px solid ${COLORS.BORDER_LIGHT};
    border-radius: ${BORDER_RADIUS.MD};
    transition: all ${TRANSITIONS.NORMAL};
    outline: none;
    width: 100%;
  }

  .input::placeholder {
    color: ${COLORS.TEXT_LIGHT};
  }

  .input:focus {
    border-color: ${COLORS.PRIMARY};
    box-shadow: 0 0 0 3px ${COLORS.PRIMARY_LIGHT};
  }

  .input--error {
    border-color: ${COLORS.ERROR};
  }

  .input--error:focus {
    border-color: ${COLORS.ERROR};
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .input--disabled {
    background-color: ${COLORS.GRAY_100};
    cursor: not-allowed;
    opacity: 0.6;
  }

  .input__error {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.ERROR};
    margin-top: -${SPACING.XS};
  }

  .input__helper {
    font-size: ${FONT_SIZES.SM};
    color: ${COLORS.TEXT_SECONDARY};
    margin-top: -${SPACING.XS};
  }
`;

document.head.appendChild(styles);

export {};
