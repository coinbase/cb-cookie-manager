import Cookies, { CookieAttributes } from 'js-cookie';
import React, { createContext, useCallback, useContext, useEffect } from 'react';

import {
  ADVERTISING_SHARING_ALLOWED,
  DEFAULT_CONSENT_PREFERENCES_COOKIE,
  EU_CONSENT_PREFERENCES_COOKIE,
  MAX_COOKIE_SIZE,
  REQUIRED_COOKIE_MANAGER_COOKIES,
} from './constants';
import { useTrackingManager } from './TrackingManagerContext';
import {
  AdTrackingPreference,
  Config,
  ErrorFunction,
  LogFunction,
  Region,
  SetCookieFunction,
  TrackerType,
  TrackingPreference,
} from './types';
import getAllCookies, { areRecordsEqual } from './utils/getAllCookies';
import getDefaultTrackingPreference from './utils/getDefaultTrackingPreference';
import { getDomainWithoutSubdomain, getHostname } from './utils/getDomain';
import getTrackerInfo from './utils/getTrackerInfo';
import hasConsent from './utils/hasConsent';
import isMaxKBSize from './utils/isMaxKBSize';
import setExpiryForCookie from './utils/setExpiryForCookie';
import setGTMVariables from './utils/setGTMVariables';

type CookieCache = Record<string, any>;
const CookieContext = createContext<CookieCache>([{}]);

type Props = {
  children: React.ReactNode;
};

export const CookieProvider = ({ children }: Props) => {
  const { config, region, shadowMode, log, onPreferenceChange } = useTrackingManager();

  const POLL_INTERVAL = 500;
  let cookieValues: Record<string, any> = {};
  let trackingPreference: TrackingPreference;
  let adTrackingPreference: AdTrackingPreference;

  const removeCookies = useCallback(
    (cookies: string[]) => {
      cookies.forEach((c) => {
        if (!shadowMode) {
          Cookies.remove(c, { domain: getDomainWithoutSubdomain(), path: '/' });
          Cookies.remove(c, { domain: getHostname(), path: '/' });
        }
        log('Cookie does not have consent and will be removed', {
          cookie: c,
        });
      });
    },
    [shadowMode, log]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkCookies = () => {
        const currentCookie = getAllCookies();
        if (!areRecordsEqual(cookieValues, currentCookie)) {
          cookieValues = currentCookie;
          trackingPreference = getTrackingPreference(cookieValues, region, config);
          adTrackingPreference = getAdTrackingPreference(cookieValues);
          setGTMVariables(trackingPreference, adTrackingPreference);
          const cookiesToRemove: Array<string> = [];
          Object.keys(cookieValues).forEach((c) => {
            const trackerInfo = getTrackerInfo(c, config);
            if (REQUIRED_COOKIE_MANAGER_COOKIES.includes(c)) {
              return;
            }
            if (!trackerInfo) {
              // This cookie is not present in the config. For legal/compliance
              // reasons, any cookies not listed in the config may not be set.
              cookiesToRemove.push(c);
              return;
            }

            if (
              !hasConsent(c, config, trackingPreference) &&
              trackerInfo.type === TrackerType.COOKIE
            ) {
              cookiesToRemove.push(c);
            }
          });
          removeCookies(cookiesToRemove);
        }
      };

      checkCookies();
      // Call the function once before setting the interval
      const intervalId = setInterval(checkCookies, POLL_INTERVAL);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);
  useEffect(() => {
    if (onPreferenceChange) {
      onPreferenceChange(trackingPreference);
    }
  }, []);

  return <CookieContext.Provider value={cookieValues}>{children}</CookieContext.Provider>;
};

export const useSetCookie = () => {
  const cookieChangedRef = useContext(CookieContext);
  const { config, region, log, shadowMode, onError } = useTrackingManager();
  const trackingPreference = getTrackingPreference(cookieChangedRef, region, config);
  return useCallback(
    (cookieName: string, value: any, options?: CookieAttributes) => {
      const setCookieFunc = setCookieFunction({
        cookieName,
        trackingPreference,
        config,
        log,
        shadowMode,
        onError,
      });
      setCookieFunc(value, options);
    },
    [trackingPreference, config, log, shadowMode, onError]
  );
};

const setCookieFunction = ({
  cookieName,
  trackingPreference,
  config,
  shadowMode,
  log,
  onError,
}: {
  cookieName: string;
  trackingPreference: TrackingPreference;
  config: Config;
  shadowMode?: boolean;
  log: LogFunction;
  onError: ErrorFunction;
}): SetCookieFunction => {
  return (value: any, options?: CookieAttributes) => {
    if (value === undefined || value === null) {
      Cookies.remove(cookieName, options);
      return;
    }
    const cookieHasConsent = hasConsent(cookieName, config, trackingPreference);

    if (cookieHasConsent || shadowMode) {
      const stringValue = JSON.stringify(value);
      const cookieSize = options?.size ?? MAX_COOKIE_SIZE;
      /*
      Url encoded cookie string (since that is what Cookies.set coverts the string into) including its name must not exceed 4KB
      For example, "," becomes %22%2C%2C making it go from 3 characters to now 9. The size has tripled.
      This is why we need to compare the url encoded stringValue instead of the stringValue itself to account for the extra characters.
      */
      if (isMaxKBSize(encodeURIComponent(stringValue) + cookieName, cookieSize)) {
        onError(new Error(`${cookieName} value exceeds ${cookieSize}KB`));
      } else {
        let newOptions = options ? { ...options } : undefined;

        if (newOptions?.size) {
          delete newOptions.size;
        }
        const expiration = setExpiryForCookie(cookieName, config) as number | Date | undefined;
        if (expiration) {
          if (newOptions) {
            newOptions = { ...newOptions, expires: expiration };
          } else {
            newOptions = { expires: expiration };
          }
        }
        Cookies.set(cookieName, stringValue, newOptions);
      }
    }
    if (!cookieHasConsent) {
      log('Cookie does not have consent and will not be set', {
        cookie: cookieName,
      });
    }
  };
};

const getTrackingPreference = (
  cookieCache: Record<string, any>,
  region: Region,
  config: Config
): TrackingPreference => {
  const trackingPreference =
    region === Region.EU
      ? cookieCache[EU_CONSENT_PREFERENCES_COOKIE]
      : cookieCache[DEFAULT_CONSENT_PREFERENCES_COOKIE];
  return trackingPreference || getDefaultTrackingPreference(region, config);
};

const adTrackingDefault = { value: 'true' };

const getAdTrackingPreference = (cookieCache: Record<string, any>): AdTrackingPreference => {
  const adTrackingPreference = cookieCache[ADVERTISING_SHARING_ALLOWED];
  return adTrackingPreference || adTrackingDefault;
};

export const useCookie = (cookieName: string): [any | undefined, SetCookieFunction] => {
  const cookieCache = useContext(CookieContext);
  const { config, region, log, shadowMode, onError } = useTrackingManager();
  const trackingPreference = getTrackingPreference(cookieCache, region, config);
  const setCookie = setCookieFunction({
    cookieName,
    trackingPreference,
    config,
    log,
    shadowMode,
    onError,
  });

  const cookieValue = useContext(CookieContext)[cookieName];

  return [cookieValue, setCookie];
};
