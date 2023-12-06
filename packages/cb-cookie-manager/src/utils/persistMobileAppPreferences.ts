/*
 * The purpose here is to allow the iOS/Android app to send a is_mobile_app=true
 * parameter that should indicate to the web surfaces not to show the
 * cookie banner
 *
 */

import { IS_MOBILE_APP } from '../constants';
import { getDomainWithoutSubdomain } from './getDomain';

export function persistMobileAppPreferences() {
  try {
    const isMobileApp = getIsMobileAppFromQueryParams();
    if (isMobileApp) {
      document.cookie = `${IS_MOBILE_APP}=true; domain=${getDomainWithoutSubdomain()}`;
    }
  } catch (e) {
    // Ignore, we are not in a browser.
  }
}

export function getIsMobileAppFromQueryParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const isWebView = params.get('webview') === 'true';
    const isMobileApp = params.get(IS_MOBILE_APP) === 'true';
    return Boolean(isWebView || isMobileApp);
  } catch (e) {
    // Ignore, we are not in a browser.
  }
  return false;
}
