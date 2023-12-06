/** The values for these CSS variables are defined in [styles/borderRadius](./styles/borderRadius.ts) */
export const borderRadius = {
  roundedNone: 'var(--border-radius-rounded-none)',
  roundedSmall: 'var(--border-radius-rounded-small)',
  rounded: 'var(--border-radius-rounded)',
  roundedMedium: 'var(--border-radius-rounded-medium)',
  roundedLarge: 'var(--border-radius-rounded-large)',
  roundedXLarge: 'var(--border-radius-rounded-x-large)',
  roundedFull: 'var(--border-radius-rounded-full)',
} as const;

/** The values for these CSS variables are defined in [styles/borderWidth](./styles/borderWidth.ts) */
export const borderWidth = {
  none: 'var(--border-width-none)',
  button: 'var(--border-width-button)',
  card: 'var(--border-width-card)',
  checkbox: 'var(--border-width-checkbox)',
  radio: 'var(--border-width-radio)',
  sparkline: 'var(--border-width-sparkline)',
  focusRing: 'var(--border-width-focus-ring)',
  input: 'var(--border-width-input)',
} as const;

export const spacing = {
  '0': 'var(--spacing-0)',
  '1': 'var(--spacing-1)',
  '2': 'var(--spacing-2)',
  '3': 'var(--spacing-3)',
  '4': 'var(--spacing-4)',
  '5': 'var(--spacing-5)',
  '6': 'var(--spacing-6)',
  '7': 'var(--spacing-7)',
  '8': 'var(--spacing-8)',
  '9': 'var(--spacing-9)',
  '10': 'var(--spacing-10)',
  '0.5': 'var(--spacing-0\\.5)',
  '1.5': 'var(--spacing-1\\.5)',
} as const;

export const palette = {
  foreground: 'var(--foreground)',
  foregroundMuted: 'var(--foreground-muted)',
  background: 'var(--background)',
  backgroundAlternate: 'var(--background-alternate)',
  backgroundOverlay: 'var(--background-overlay)',
  line: 'var(--line)',
  lineHeavy: 'var(--line-heavy)',
  primary: 'var(--primary)',
  primaryWash: 'var(--primary-wash)',
  primaryForeground: 'var(--primary-foreground)',
  negative: 'var(--negative)',
  negativeForeground: 'var(--negative-foreground)',
  positive: 'var(--positive)',
  positiveForeground: 'var(--positive-foreground)',
  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',
  transparent: 'var(--transparent)',
} as const;

export const control = {
  checkboxSize: 'var(--checkbox-size)',
  radioSize: 'var(--radio-size)',
  switchWidth: 'var(--switch-width)',
  switchHeight: 'var(--switch-height)',
  switchThumbSize: 'var(--switch-thumb-size)',
} as const;

export const fontFamily = {
  display: 'var(--cds-font-display)',
  sans: 'var(--cds-font-sans)',
  text: 'var(--cds-font-text)',
  mono: 'var(--cds-font-mono)',
} as const;

export const mediaQueries = {
  supportsHover: '@media (any-hover: hover)',
} as const;
