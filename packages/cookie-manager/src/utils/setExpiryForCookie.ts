import { CATEGORY_EXPIRATION_DAYS } from '../constants';
import { Config } from '../types';
import getTrackerCategory from './getTrackerCategory';
import trackerMatches from './trackerMatches';

const setExpiryForCookie = (cookieName: string, config: Config) => {
  const trackingCategory = getTrackerCategory(cookieName, config);
  if (!trackingCategory) {
    return undefined;
  }

  // if cookie has an expiry, set the expiry to that
  const cookieConfig = trackingCategory.trackers.find((tracker) =>
    trackerMatches(tracker, cookieName)
  );

  if (!cookieConfig) {
    return undefined;
  }

  // if its a session cookie, do not set an expiry
  if (cookieConfig && cookieConfig.sessionCookie) {
    return undefined;
  }

  if (cookieConfig && cookieConfig.expiry) {
    return cookieConfig.expiry;
  }
  // if cookie is in a category with an expiry, set the expiry to that
  const trackingCategoryExpiration = CATEGORY_EXPIRATION_DAYS[trackingCategory.id];
  if (!trackingCategoryExpiration) {
    return undefined;
  }
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + trackingCategoryExpiration);
  return expiration;
};

export default setExpiryForCookie;
