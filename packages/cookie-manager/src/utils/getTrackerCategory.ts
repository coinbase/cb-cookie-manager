import { Config, ConfigCategoryInfo } from '../types';
import trackerMatches from './trackerMatches';

const getTrackerCategory = (trackerId: string, config: Config): ConfigCategoryInfo | undefined => {
  const category = config.categories.find((category) =>
    category.trackers.find((tracker) => trackerMatches(tracker, trackerId))
  );
  return category;
};

export default getTrackerCategory;
