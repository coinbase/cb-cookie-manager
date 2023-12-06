import { useSavedTrackingPreference } from 'cb-cookie-manager';

export default function useIsBannerVisible() {
  return !useSavedTrackingPreference();
}
