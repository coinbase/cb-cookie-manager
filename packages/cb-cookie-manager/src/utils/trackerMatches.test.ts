import { Tracker, TrackerType } from '../types';
import trackerMatches from './trackerMatches';

describe('TrackerMatches', () => {
  it('it is able to detect the cookie matches the tracker', () => {
    const tracker: Tracker = {
      id: 'id-regex',
      type: TrackerType.COOKIE,
      regex: 'id(?:_[a-f0-9]{32}|undefined)(?:.*)',
    };
    expect(trackerMatches(tracker, 'id_ac7a5c3da45e3612b44543a702e42b01')).toEqual(true);
  });
});
