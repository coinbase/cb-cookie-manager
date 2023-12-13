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

  if (cookieConfig && cookieConfig.expiry) {
    return {
      expires: cookieConfig.expiry,
    };
  }
  // if cookie is in a category with an expiry, set the expiry to that
  const trackingCategoryExpiration = CATEGORY_EXPIRATION_DAYS[trackingCategory.id];
  if (!trackingCategoryExpiration) {
    return undefined;
  }
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + trackingCategoryExpiration);
  return {
    expires: expiration,
  };
};

export default setExpiryForCookie;
