import { useSavedTrackingPreference } from '@coinbase/cookie-manager';

export default function useIsBannerVisible() {
  return !useSavedTrackingPreference();
}
