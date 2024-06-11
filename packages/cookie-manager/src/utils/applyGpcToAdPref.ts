import { AdTrackingPreference, Region } from '../types';

const applyGpcToAdPref = (
  region: Region,
  preference: AdTrackingPreference
): AdTrackingPreference => {
  // We are only applying GPC in non-EU countries at this point
  if (region == Region.EU) {
    return preference;
  }

  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return preference;
  }

  // If we lack GPC or it's set ot false we are done
  if (!(window.navigator as any).globalPrivacyControl) {
    return preference;
  }

  // If the user already has sharing turned off nothing to do here
  if (preference.value == false) {
    return preference; // already allowing sharing
  }

  // We could set the updated at time to now if we'd like
  // preference.updated_at = new Date().getTime();

  const pref: AdTrackingPreference = preference.updated_at
    ? { value: false, updated_at: preference.updated_at }
    : { value: false };

  return pref;
};

export { applyGpcToAdPref };
