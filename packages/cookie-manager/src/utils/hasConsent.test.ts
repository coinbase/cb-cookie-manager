import { REQUIRED_COOKIE_MANAGER_COOKIES } from '../constants';
import config from '../examples/config';
import { Region, TrackingCategory, TrackingPreference } from '../types';
import hasConsent from './hasConsent';

describe('hasConsent', () => {
  let preference: TrackingPreference;
  beforeEach(() => {
    preference = {
      region: Region.DEFAULT,
      consent: [
        TrackingCategory.NECESSARY,
        TrackingCategory.PERFORMANCE,
        TrackingCategory.FUNCTIONAL,
        TrackingCategory.TARGETING,
      ],
    };
  });

  it('defaults to false if cookie is uncategorized', () => {
    expect(hasConsent('random_cookie', config, preference)).toEqual(false);
  });

  it('returns true for required cookie', () => {
    preference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.PERFORMANCE],
    };

    expect(hasConsent('logged_in', config, preference)).toEqual(true);
  });

  it('returns true for cookies that are required to function', () => {
    preference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.PERFORMANCE],
    };
    REQUIRED_COOKIE_MANAGER_COOKIES.map((c) => {
      expect(hasConsent(c, config, preference)).toEqual(true);
    });
  });

  it('returns the correct consent', () => {
    preference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.PERFORMANCE],
    };
    // Default
    expect(hasConsent('device_id', config, preference)).toEqual(true);
    expect(hasConsent('locale', config, preference)).toEqual(true);

    // EU
    preference = {
      region: Region.EU,
      consent: [TrackingCategory.PERFORMANCE],
    };
    expect(hasConsent('device_id', config, preference)).toEqual(true);
    preference = {
      region: Region.EU,
      consent: [TrackingCategory.FUNCTIONAL],
    };
    expect(hasConsent('g_clid', config, preference)).toEqual(false);
  });
});
