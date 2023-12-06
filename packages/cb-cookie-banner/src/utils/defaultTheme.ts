export default {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#FFFFFF',
    backgroundMuted: '#FAFBFC',
    onBackground: '#050F1A',
    onBackgroundMuted: '#708599',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    hidden: -1,
    /* Hidden behind everything else */
    normal: 0,
    /* Default for all elements */
    elevated: 1,
    /* Above normal elements */
    high: 2,
    /* Above advanced trading chart elements */
    extraHigh: 25,
    /* Above elevated elements (exceptional high-value cases, e.g. tooltips) */
    backdrop: 999,
    /* Above all elements */
    overlay: 1000,
    /* Above backdrop (e.g. backdrop content, modal) */
    top: 1001,
    /* Above overlay (e.g. toasts) */
  },
};
