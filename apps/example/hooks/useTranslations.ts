import { useTrackingManager } from 'cb-cookie-manager';
import { useCallback, useEffect, useRef, useState } from 'react';

type TranslationsType = Record<string, string>;

type UpdateTranslationsParams = {
  newTranslations?: TranslationsType;
  newLocale: string;
};

/**
 * URL for fetching translations
 */

const TRANSLATIONS_URL = process.env.NEXT_PUBLIC_TRANSLATIONS_URL || '';

const TRANSLATIONS_FILE_NAME = 'cookie-manager-messages.json';

let cachedTranslations: TranslationsType | undefined;

const useTranslations = (): [boolean, TranslationsType] => {
  const { onError, locale } = useTrackingManager();
  const prevLocale = useRef<string | undefined>();
  const [loaded, setLoaded] = useState(!!cachedTranslations);
  const [translations, setTranslations] = useState(cachedTranslations || {});

  const updateTranslations = useCallback(
    ({ newTranslations = {}, newLocale }: UpdateTranslationsParams) => {
      prevLocale.current = newLocale;
      setTranslations(newTranslations);
      cachedTranslations = newTranslations;
      setLoaded(true);
    },
    [setTranslations, setLoaded]
  );

  const resetTranslations = useCallback(() => {
    setTranslations({});
    cachedTranslations = undefined;
    setLoaded(false);
  }, [setTranslations, setLoaded]);

  useEffect(() => {
    let isMounted = true;
    async function fetchTranslations() {
      try {
        const response = await fetch(`${TRANSLATIONS_URL}/${locale}/${TRANSLATIONS_FILE_NAME}`);

        if (response.ok) {
          const body = await response.json();
          const newTranslations: Record<string, string> = {};
          Object.keys(body).forEach((key) => {
            newTranslations[key] = body[key].defaultMessage;
          });

          if (isMounted) {
            updateTranslations({ newTranslations, newLocale: locale });
          }
        } else {
          throw new Error('Missing translations');
        }
      } catch (e) {
        // onError(e);
        console.log(e);
        if (isMounted) updateTranslations({ newLocale: locale });
      }
    }

    const isEnglish = ['en', 'en-US'].includes(locale);
    if (!isEnglish && prevLocale.current !== locale) {
      resetTranslations();
      fetchTranslations();
    } else if (isEnglish) {
      updateTranslations({ newLocale: locale });
    }

    return () => {
      isMounted = false;
    };
  }, [onError, locale]);

  return [loaded, translations];
};

export default useTranslations;
