import { Region, TrackingCategory } from '../types';
import applyGpcToCookiePref from './applyGpcToCookiePref';

describe('applyGpcToCookiePref', () => {
  it('removes targeting when GPC is ON in non-EU', () => {
    (navigator as any).globalPrivacyControl = true;
    expect(
      applyGpcToCookiePref({ region: Region.DEFAULT, consent: [TrackingCategory.TARGETING] })
    ).toEqual({
      region: Region.DEFAULT,
      consent: [],
    });
  });

  it('does not remove targeting when GPC is ON in EU', () => {
    (navigator as any).globalPrivacyControl = true;
    expect(
      applyGpcToCookiePref({ region: Region.EU, consent: [TrackingCategory.TARGETING] })
    ).toEqual({
      region: Region.EU,
      consent: [TrackingCategory.TARGETING],
    });
  });

  it('retains targeting when GPC is OFF', () => {
    (navigator as any).globalPrivacyControl = false;
    expect(
      applyGpcToCookiePref({ region: Region.DEFAULT, consent: [TrackingCategory.TARGETING] })
    ).toEqual({
      region: Region.DEFAULT,
      consent: [TrackingCategory.TARGETING],
    });
  });

  it('retains targeting when GPC is undefined', () => {
    delete (navigator as any).globalPrivacyControl;
    expect(
      applyGpcToCookiePref({ region: Region.DEFAULT, consent: [TrackingCategory.TARGETING] })
    ).toEqual({
      region: Region.DEFAULT,
      consent: [TrackingCategory.TARGETING],
    });
  });
});
