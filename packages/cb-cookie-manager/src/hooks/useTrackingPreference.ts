import { useTrackingManager } from '../TrackingManagerContext';
import { TrackingPreference } from '../types';
import getDefaultTrackingPreference from '../utils/getDefaultTrackingPreference';
import { useSavedTrackingPreference } from './useSavedTrackingPreference';

const useTrackingPreference = (): TrackingPreference => {
  const preference = useSavedTrackingPreference();
  const { region, config } = useTrackingManager();

  if (!preference) return getDefaultTrackingPreference(region, config);

  return preference;
};

export default useTrackingPreference;
