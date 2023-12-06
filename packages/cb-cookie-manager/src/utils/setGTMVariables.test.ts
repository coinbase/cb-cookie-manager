import { AdTrackingPreference, Region, TrackingCategory, TrackingPreference } from '../types';
import setGTMVariables from './setGTMVariables';

describe('SetGTMVariables', () => {
  it('is able to set GTM Variables', () => {
    const preference: TrackingPreference = {
      consent: [TrackingCategory.NECESSARY],
      region: Region.EU,
    };
    const adTrackingPreference: AdTrackingPreference = {
      value: true,
      updated_at: 1,
    };
    setGTMVariables(preference, adTrackingPreference);
    expect(window.dataLayer).toEqual([
      { consent: [TrackingCategory.NECESSARY] },
      { adConsent: 'true' },
    ]);
  });
});
