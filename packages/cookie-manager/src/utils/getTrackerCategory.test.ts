import config from '../examples/config';
import { TrackingCategory } from '../types';
import getTrackerCategory from './getTrackerCategory';

const exampleSimpleTrackers = {
  locale: TrackingCategory.NECESSARY,
  device_id: TrackingCategory.PERFORMANCE,
  mode: TrackingCategory.FUNCTIONAL,
  gclid: TrackingCategory.TARGETING,
};

const exampleDynamicTrackers = {
  'idundefined.com': TrackingCategory.TARGETING,
  id_ac7a5c3da45e3612b44543a702e42b01: TrackingCategory.TARGETING,
  id_132e62b5953ce8d568137d5887b6b7ab_classic: TrackingCategory.TARGETING,
  id_ac7a5c3da45e3612b44543a702e42b01_classic: TrackingCategory.TARGETING,
  id_5e21e8a10d7c1553bc75ce1ff6d49a3f_realtime: TrackingCategory.TARGETING,
  id_4031eff2d750cfe4385594be339acc56_realtime: TrackingCategory.TARGETING,
  'id_4031eff2d750cfe4385594be339acc56_realtimecoinbase.com': TrackingCategory.TARGETING,
  'id_132e62b5953ce8d568137d5887b6b7abcoinbase.com': TrackingCategory.TARGETING,
};

describe('getTrackerCategory', () => {
  it('matches simple trackers via id', () => {
    for (const [tracker, categoryId] of Object.entries(exampleSimpleTrackers)) {
      expect(getTrackerCategory(tracker, config)?.id).toEqual(categoryId);
    }
  });
  it('matches dynamic trackers not matching ids via regex', () => {
    for (const [tracker, categoryId] of Object.entries(exampleDynamicTrackers)) {
      expect(getTrackerCategory(tracker, config)?.id).toEqual(categoryId);
    }
  });
});
