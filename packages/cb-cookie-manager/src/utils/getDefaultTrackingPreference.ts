import { Config, Region, TrackingCategory, TrackingPreference } from '../types';
import isOptOut from './isOptOut';

const getDefaultTrackingPreference = (region: Region, config: Config): TrackingPreference => {
  // In opt in regions, we only allow required trackers

  if (!isOptOut(region)) {
    const categories = config.categories
      .map((c) => {
        if (c.required) {
          return c.id;
        }
      })
      .filter((c) => !!c) as TrackingCategory[];
    return { region, consent: categories };
  }

  const categories = config.categories
    .map((c) => c.id)
    .filter((id) => id !== TrackingCategory.DELETE_IF_SEEN);

  return {
    region,
    consent: categories,
  };
};

export default getDefaultTrackingPreference;
