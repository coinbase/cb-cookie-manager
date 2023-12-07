import { CookieAttributes } from 'js-cookie';

import {
  DEFAULT_CONSENT_PREFERENCES_COOKIE,
  EU_CONSENT_PREFERENCES_COOKIE,
  PREFERENCE_EXPIRATION_YEAR,
} from '../constants';
import { Region, TrackingPreference } from '../types';
import { getDomainWithoutSubdomain } from './getDomain';

const setTrackingPreference = (
  setCookie: (name: string, value: any, options?: CookieAttributes) => void,
  newConsentPreference: TrackingPreference,
  region: Region,
  onPreferenceChange?: (preference: TrackingPreference) => void
) => {
  const expiration = PREFERENCE_EXPIRATION_YEAR * 365;

  const cookieOptions = {
    expires: expiration,
    domain: getDomainWithoutSubdomain(),
    path: '/',
  };

  if (region === 'EU') {
    setCookie(EU_CONSENT_PREFERENCES_COOKIE, newConsentPreference, cookieOptions);
  } else {
    setCookie(DEFAULT_CONSENT_PREFERENCES_COOKIE, newConsentPreference, cookieOptions);
  }

  if (onPreferenceChange) {
    onPreferenceChange(newConsentPreference);
  }
};

export default setTrackingPreference;
