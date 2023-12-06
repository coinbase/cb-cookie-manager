import {
  getDefaultTrackingPreference,
  getDomainWithoutSubdomain,
  isOptOut,
  persistMobileAppPreferences,
  Region,
  useCookie,
  useSavedTrackingPreference,
  useSavedTrackingPreferenceFromMobileApp,
  useSetTrackingPreference,
  useTrackingManager,
} from 'cb-cookie-manager';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { EXPIRATION_DAYS } from '../constants';
import defaultTheme from '../utils/defaultTheme';
import BannerContent from './CookieBannerContent';
import CookiePreferencesModal from './CookiePreferencesModal';
import { Theme } from './types';
import UIProviders from './UIProviders';

type Props = {
  theme?: Theme;
  link?: string;
  useTranslations?:
    | ((() => [boolean, Record<string, string>]) & (() => [boolean, Record<string, string>]))
    | undefined;
};

const cookieOptions = {
  expires: EXPIRATION_DAYS,
  domain: getDomainWithoutSubdomain(),
  path: '/',
};

export const useBanner = () => {
  const savedPreference = useSavedTrackingPreference();
  const mobileAppPreference = useSavedTrackingPreferenceFromMobileApp();
  const preference = savedPreference || mobileAppPreference;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(!!preference);
  const { region, config } = useTrackingManager();
  const optOutRegion = isOptOut(region);
  const defaultPreferences = getDefaultTrackingPreference(region, config);
  const setTrackingPreference = useSetTrackingPreference();
  const [, setAdvertisingSharingAllowedCookie] = useCookie('ADVERTISING_SHARING_ALLOWED');

  const handleBannerDismiss = useCallback(() => {
    // Only set default tracking preferences on dismiss if we are in an opt out
    // country and if a preference doesn't already exist
    if (optOutRegion && !preference) {
      setTrackingPreference(defaultPreferences);
    }
    setHasDismissed(true);
  }, [defaultPreferences, optOutRegion, preference, setTrackingPreference]);

  const handleAcceptAll = useCallback(() => {
    const preferences = getDefaultTrackingPreference(Region.DEFAULT, config);
    setTrackingPreference({ region, consent: preferences.consent });
    setHasDismissed(true);
  }, [config, setTrackingPreference, region]);

  const closeModal = useCallback(() => {
    setHasDismissed(true);
    setIsModalOpen(false);
  }, [setIsModalOpen, setHasDismissed]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const shouldSaveMobileAppPreferences = Boolean(!savedPreference && mobileAppPreference);

  useEffect(() => {
    if (shouldSaveMobileAppPreferences && mobileAppPreference) {
      // Set the is_mobile_app cookie.
      persistMobileAppPreferences();
      // advertising sharing disabled, if `is_mobile_app` is set
      const isEnabled = false;
      const updatedAt = Date.now();
      setAdvertisingSharingAllowedCookie(
        {
          value: isEnabled,
          updatedAt,
        },
        cookieOptions
      );
      // Set the cookie banner preferences.
      setTrackingPreference(mobileAppPreference);
    }
  }, [shouldSaveMobileAppPreferences]);

  return {
    isModalOpen,
    hasDismissed,
    handleBannerDismiss,
    handleAcceptAll,
    closeModal,
    openModal,
  };
};

function Banner({ theme, link, useTranslations }: Props) {
  const { hasDismissed, handleBannerDismiss, handleAcceptAll, closeModal, openModal, isModalOpen } =
    useBanner();

  return (
    <UIProviders theme={theme || defaultTheme} useTranslations={useTranslations}>
      <CookiePreferencesModal onClose={closeModal} isOpen={isModalOpen} link={link} />
      <BannerContent
        onDismiss={handleBannerDismiss}
        onAccept={handleAcceptAll}
        showPreferencesModal={openModal}
        hasDismissed={hasDismissed}
        link={link}
      />
    </UIProviders>
  );
}

export default memo(Banner);
