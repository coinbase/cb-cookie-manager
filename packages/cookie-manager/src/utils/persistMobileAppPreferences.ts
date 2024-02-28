/*
 * From the iOS app, the `Do Not Track` preference from the app should be read and
 * a `app_tracking_transparency_enabled=true` URL parameter is set to indicate the
 * app tracking pereferences. The setting is then persisted in a cookie to honor the
 * user preference for when a WebView is opened from within the mobile app.
 */

import { IS_MOBILE_APP } from '../constants';
import { getDomainWithoutSubdomain } from './getDomain';

export function persistMobileAppPreferences() {
  try {
    const isMobileApp = getAppTrackingTransparencyFromQueryParams();
    if (isMobileApp) {
      document.cookie = `${IS_MOBILE_APP}=true; domain=${getDomainWithoutSubdomain()}`;
    }
  } catch (e) {
    // Ignore, we are not in a browser.
  }
}

export function getAppTrackingTransparencyFromQueryParams() {
  try {
    const params = new URLSearchParams(window.location.search);

    const appTrackingTransparency = params.get('app_tracking_transparency_enabled') === 'true';
    return Boolean(appTrackingTransparency);
  } catch (e) {
    // Ignore, we are not in a browser.
  }
  return false;
}
