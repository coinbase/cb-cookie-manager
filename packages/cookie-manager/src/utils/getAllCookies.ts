import Cookies from 'js-cookie';

export { Region } from '../types';

import {
  ADVERTISING_SHARING_ALLOWED,
  DEFAULT_CONSENT_PREFERENCES_COOKIE,
  EU_CONSENT_PREFERENCES_COOKIE,
} from '../constants';
import { Region } from '../types';
import { applyGpcToAdPref } from './applyGpcToAdPref';
import { applyGpcToCookiePref } from './applyGpcToCookiePref';

export const deserializeCookies = (region: Region, cookies: Record<string, string>) => {
  const parsedCookies: Record<string, any> = {};

  Object.keys(cookies).forEach((c) => {
    try {
      parsedCookies[c] = JSON.parse(cookies[c]);
    } catch (e) {
      parsedCookies[c] = cookies[c];
    }
    parsedCookies[c] = filterCookieValue(region, c, parsedCookies[c]);
  });
  return parsedCookies;
};

export default function getAllCookies(region: Region, initialCookies?: Record<string, string>) {
  if (typeof window === 'undefined' && initialCookies) {
    return deserializeCookies(region, initialCookies);
  }
  return deserializeCookies(region, Cookies.get() || {});
}

// Apply in in memory filters to the cookie values.  Currently we are just apply
// Global Privacy Control (GPC) logic to ensure we are honoring GPC
function filterCookieValue(region: Region, cookieName: string, cookieValue: any) {
  if (cookieName == ADVERTISING_SHARING_ALLOWED) {
    cookieValue = applyGpcToAdPref(region, cookieValue);
  } else if (
    (region == Region.DEFAULT && cookieName == DEFAULT_CONSENT_PREFERENCES_COOKIE) ||
    (region == Region.EU && cookieName == EU_CONSENT_PREFERENCES_COOKIE)
  ) {
    cookieValue = applyGpcToCookiePref(cookieValue);
  }
  return cookieValue;
}

export function areRecordsEqual(
  record1: Record<string, any>,
  record2: Record<string, any>
): boolean {
  // Check if the number of keys is the same
  const keys1 = Object.keys(record1);
  const keys2 = Object.keys(record2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys and their values are equal
  for (const key of keys1) {
    if (!deepEqual(record1[key], record2[key])) {
      return false;
    }
  }

  return true;
}

function deepEqual(value1: any, value2: any): boolean {
  if (typeof value1 !== typeof value2) {
    return false;
  }

  if (typeof value1 === 'object' && value1 !== null) {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!deepEqual(value1[key], value2[key])) {
        return false;
      }
    }
  } else if (value1 !== value2) {
    return false;
  }

  return true;
}
