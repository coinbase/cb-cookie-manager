import { useTrackingManager } from 'cb-cookie-manager';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { Theme } from './types';

type Props = {
  children: React.ReactNode;
  theme?: Theme;
  useTranslations?:
    | ((() => [boolean, Record<string, string>]) & (() => [boolean, Record<string, string>]))
    | undefined;
};

function UIProviders({ children, theme, useTranslations }: Props) {
  const { locale } = useTrackingManager();
  let translations: Record<string, string> = {};
  if (useTranslations) {
    const [isLoaded, t] = useTranslations();
    if (!isLoaded) return null;
    translations = t;
  }
  return (
    <IntlProvider messages={translations || {}} locale={locale}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
}

export default UIProviders;
