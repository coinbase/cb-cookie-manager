import { css } from 'linaria';

import { borderWidth } from './tokens';

export const borderWidthTokens = {
  none: 0,
  button: 1,
  card: 1,
  checkbox: 2,
  radio: 2,
  sparkline: 2,
  focusRing: 2,
  input: 1,
} as const;

export const borderWidthVariables = {
  '--border-width-none': `${borderWidthTokens.none}px`,
  '--border-width-button': `${borderWidthTokens.button}px`,
  '--border-width-card': `${borderWidthTokens.card}px`,
  '--border-width-checkbox': `${borderWidthTokens.checkbox}px`,
  '--border-width-radio': `${borderWidthTokens.radio}px`,
  '--border-width-sparkline': `${borderWidthTokens.sparkline}px`,
  '--border-width-focus-ring': `${borderWidthTokens.focusRing}px`,
  '--border-width-input': `${borderWidthTokens.input}px`,
};

export const none = css`
  border-width: ${borderWidth.none};
`;

export const button = css`
  border-width: ${borderWidth.button};
`;

export const card = css`
  border-width: ${borderWidth.card};
`;

export const checkbox = css`
  border-width: ${borderWidth.checkbox};
`;

export const radio = css`
  border-width: ${borderWidth.radio};
`;

export const sparkline = css`
  border-width: ${borderWidth.sparkline};
`;

export const focusRing = css`
  border-width: ${borderWidth.focusRing};
`;

export const input = css`
  border-width: ${borderWidth.input};
`;
