import { Region, TrackingCategory, TrackingPreference } from '../types';
// { region: Region.DEFAULT,  consent: ['necessary', 'performance', 'functional', 'targeting'] }
const applyGpcToCookiePref = (preference: TrackingPreference): TrackingPreference => {
  // We are only applying GPC in non-EU countries at this point
  if (preference.region == Region.EU) {
    return preference;
  }

  // TODO: We want to support server side render flows
  // where the user can set an initial value and indicate that gpc has been enabled
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return preference;
  }

  if (!(window.navigator as any).globalPrivacyControl) {
    return preference;
  }
  // If the user had opted in to GPC we want to honor it
  const categories = preference.consent.filter((cat) => cat !== TrackingCategory.TARGETING);

  if (categories == preference.consent) {
    return preference;
  }
  const pref = { region: preference.region, consent: categories };

  return pref;
};

export { applyGpcToCookiePref };
