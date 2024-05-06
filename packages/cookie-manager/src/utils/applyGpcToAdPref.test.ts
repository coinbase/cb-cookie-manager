import { Region } from '../types';
import { applyGpcToAdPref } from './applyGpcToAdPref';

describe('applyGpcToAdPref', () => {
  it('removes targeting when GPC is ON in non-EU', () => {
    (navigator as any).globalPrivacyControl = true;
    expect(applyGpcToAdPref(Region.DEFAULT, { value: true })).toEqual({ value: false });
  });

  it('ignores GPC when in EU', () => {
    (navigator as any).globalPrivacyControl = true;
    expect(applyGpcToAdPref(Region.EU, { value: true })).toEqual({ value: true });
  });
});
