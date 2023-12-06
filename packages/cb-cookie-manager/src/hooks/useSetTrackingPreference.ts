import { useCallback } from 'react';

import { useSetCookie } from '../CookieContext';
import { useTrackingManager } from '../TrackingManagerContext';
import { TrackingPreference } from '../types';
import setTrackingPreference from '../utils/setTrackingPreference';
import useRequiredCategories from './useRequiredCategories';

const useSetTrackingPreference = (): ((preference: TrackingPreference) => void) => {
  const { region, onPreferenceChange, onError } = useTrackingManager();
  const setCookie = useSetCookie();
  const requiredCategories = useRequiredCategories();

  const changePreference = useCallback(
    (preference: TrackingPreference) => {
      const preferencesToSet = preference;
      requiredCategories.forEach((c) => {
        if (!preference.consent.includes(c)) {
          onError(new Error(`Trying to remove category ${c} that is required`));
          preferencesToSet.consent = [...preference.consent, c];
        }
      });
      setTrackingPreference(setCookie, preferencesToSet, region, onPreferenceChange);
    },
    [onError, onPreferenceChange, region, requiredCategories, setCookie]
  );

  return changePreference;
};

export default useSetTrackingPreference;
