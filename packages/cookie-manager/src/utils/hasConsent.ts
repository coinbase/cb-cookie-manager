import { REQUIRED_COOKIE_MANAGER_COOKIES } from '../constants';
import { Config, TrackingPreference } from '../types';
import getTrackerCategory from './getTrackerCategory';

/**
 * Used for determining if a specific tracker has user consent.
 * It follows the following logic in order:
 * 1) If we don't have a tracker category in the config then dont allow
 * 2) If cookie is in a required category then allow
 * 3) If cookie is required for cookie manager to function then allow
 * 4) Determine consent from user consent preferences
 */
const hasConsent = (
  tracker: string,
  config: Config,
  trackingPreference: TrackingPreference
): boolean => {
  const trackingCategory = getTrackerCategory(tracker, config);

  if (REQUIRED_COOKIE_MANAGER_COOKIES.includes(tracker)) {
    return true;
  }
  if (!trackingCategory) {
    return false;
  }
  if (trackingCategory.required) {
    return true;
  }
  return trackingPreference.consent.includes(trackingCategory.id);
};

export default hasConsent;
