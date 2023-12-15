import { ONE_DAY_IN_MILLISECONDS } from '../constants';
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

  const expiration = new Date();

  // if its a session cookie, do not set an expiry
  if (cookieConfig && cookieConfig.sessionCookie) {
    return undefined;
  }

  if (cookieConfig && cookieConfig.expiry) {
    return new Date(expiration.getTime() + cookieConfig.expiry * ONE_DAY_IN_MILLISECONDS);
  }

  if (trackingCategory) {
    return new Date(expiration.getTime() + trackingCategory.expiry * ONE_DAY_IN_MILLISECONDS);
  }

  return undefined;
};

export default setExpiryForCookie;
