import { useTrackingPreference } from '..';
import { useTrackingManager } from '../TrackingManagerContext';
import hasConsent from '../utils/hasConsent';

const useHasConsent = (tracker: string): boolean => {
  const preference = useTrackingPreference();
  const { config } = useTrackingManager();
  return hasConsent(tracker, config, preference);
};

export default useHasConsent;
