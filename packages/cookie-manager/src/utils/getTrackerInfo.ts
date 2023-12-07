import { Config } from '../types';
import getTrackerCategory from './getTrackerCategory';
import trackerMatches from './trackerMatches';

const getTrackerInfo = (trackerId: string, config: Config) => {
  const trackingCategory = getTrackerCategory(trackerId, config);
  return trackingCategory?.trackers.find((tracker) => trackerMatches(tracker, trackerId));
};

export default getTrackerInfo;
