import { AdTrackingPreference, Region } from '../types';
import getGpc from './getGpc';

const applyGpcToAdPref = (
  region: Region,
  preference: AdTrackingPreference,
  gpcHeader?: boolean
): AdTrackingPreference => {
  // We are only applying GPC in non-EU countries at this point
  if (region == Region.EU) {
    return preference;
  }
  // If the browser is has global privacy control enabled
  // we will honor it
  const gpc = getGpc(gpcHeader);
  if (!gpc) {
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
