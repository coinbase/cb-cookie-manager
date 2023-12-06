import { AdTrackingPreference, TrackingPreference } from '../types';

const setGTMVariables = (
  preference: TrackingPreference,
  adTrackingPreference: AdTrackingPreference
) => {
  if (typeof window !== 'undefined') {
    if (!window.dataLayer) window.dataLayer = [];
    const gtmData = [
      { consent: preference.consent },
      { adConsent: adTrackingPreference.value.toString() },
    ];
    window.dataLayer.push(...gtmData);
  }
};

export default setGTMVariables;
