import config from '../examples/config';
import { Region } from '../types';
import getDefaultTrackingPreference from './getDefaultTrackingPreference';

describe('getDefaultTrackingPreference', () => {
  it('returns the correct default preferences', () => {
    expect(getDefaultTrackingPreference(Region.DEFAULT, config)).toEqual({
      region: Region.DEFAULT,
      consent: ['necessary', 'performance', 'functional', 'targeting'],
    });
    expect(getDefaultTrackingPreference(Region.EU, config)).toEqual({
      region: Region.EU,
      consent: ['necessary'],
    });
  });
});
