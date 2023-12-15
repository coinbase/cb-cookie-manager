import { Framework, GeolocationRule, Region, TrackingCategory } from './types';

export const EU_CONSENT_PREFERENCES_COOKIE = 'cm_eu_preferences';
export const DEFAULT_CONSENT_PREFERENCES_COOKIE = 'cm_default_preferences';
export const ADVERTISING_SHARING_ALLOWED = 'advertising_sharing_allowed';
export const IS_MOBILE_APP = 'is_mobile_app';
export const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export const GEOLOCATION_RULES: Array<GeolocationRule> = [
  {
    region: Region.DEFAULT,
    framework: Framework.OPT_OUT as const,
  },
  {
    region: Region.EU,
    framework: Framework.OPT_IN as const,
  },
];

export const MAX_COOKIE_SIZE = 4; // in KB
export const KB = 1000;

export const REQUIRED_COOKIE_MANAGER_COOKIES = [
  EU_CONSENT_PREFERENCES_COOKIE,
  DEFAULT_CONSENT_PREFERENCES_COOKIE,
  ADVERTISING_SHARING_ALLOWED,
];

export const PREFERENCE_EXPIRATION_YEAR = 1;

export const TRACKER_CATEGORIES: Array<TrackingCategory> = [
  TrackingCategory.NECESSARY,
  TrackingCategory.FUNCTIONAL,
  TrackingCategory.PERFORMANCE,
  TrackingCategory.TARGETING,
];
