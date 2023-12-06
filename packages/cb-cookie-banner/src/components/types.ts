export type Theme = {
  colors: {
    primary: string;
    positive: string;
    negative: string;
    warning: string;
    background: string;
    onBackground: string;
    onBackgroundMuted: string;
    onPrimary: string;
    overlay: string;
  };
  border: {
    borderRadius: string;
    border: string;
  };
  fontSize: {
    sm: string;
    md: string;
  };
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  breakpoints: {
    phone: number;
    tablet: number;
    desktop: number;
  };
  zIndex: {
    hidden: number;
    normal: number;
    elevated: number;
    high: number;
    extraHigh: number;
    backdrop: number;
    overlay: number;
    top: number;
  };
};
