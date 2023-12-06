import {
  TRACKER_CATEGORIES,
  TrackingCategory,
  TrackingPreference,
  useRequiredCategories,
  useSetTrackingPreference,
  useTrackingManager,
  useTrackingPreference,
} from 'cb-cookie-manager';
import React, { memo, useCallback, useEffect, useReducer } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import useMessages from '../hooks/useMessages';
import defaultTheme from '../utils/defaultTheme';
import Button from './Button';
import CategoryLabel from './CategoryLabel';
import CheckBox from './CheckBox';
import Modal from './Modal';
import PrivacyLink from './PrivacyLink';
import Spacer from './Spacer';
import Text from './Text';
import { Theme } from './types';
import UIProviders from './UIProviders';

function reducer(state: TrackingPreference, action: { name: TrackingCategory; value: boolean }) {
  switch (action.value) {
    case true:
      if (state.consent.includes(action.name)) return state;
      return {
        ...state,
        consent: [...state.consent, action.name],
      };
    case false:
      return {
        ...state,
        consent: state.consent.filter((category) => category !== action.name),
      };
    default:
      return state;
  }
}

type Props = {
  onClose: () => void;
  isOpen: boolean;
  link?: string;
  useTranslations?:
    | ((() => [boolean, Record<string, string>]) & (() => [boolean, Record<string, string>]))
    | undefined;
};

const CookieLink = (str: React.ReactNode, link?: string) => [
  <PrivacyLink key="CookieLink" color="primary" link={link}>
    {str}
  </PrivacyLink>,
];

function CookiePreferencesModal({ onClose, isOpen, link }: Props) {
  const { region, log } = useTrackingManager();

  useEffect(() => {
    if (isOpen) log('cookie_consent_manager_viewed');
  }, [isOpen]);

  const { formatMessage } = useIntl();
  const messages = useMessages();
  const initialTrackingPreference = useTrackingPreference();
  const initialConsent = initialTrackingPreference.consent;

  const [state, dispatch] = useReducer(reducer, {
    consent: initialConsent,
    region,
  });
  const requiredCategories = useRequiredCategories();
  const setTrackingPreference = useSetTrackingPreference();

  const getLogState = useCallback((state: TrackingPreference) => {
    const logState: Record<string, any> = {};
    TRACKER_CATEGORIES.forEach((tracker) => {
      logState[tracker] = state.consent.includes(tracker) ? 1 : 0;
    });
    return logState;
  }, []);

  const handleSave = useCallback(() => {
    setTrackingPreference(state);
    log('cookie_consent_manager_saved_tapped', getLogState(state));
    onClose();
  }, [setTrackingPreference, state, log, onClose, getLogState]);

  const handleClose = useCallback(() => {
    setTrackingPreference(initialTrackingPreference);
    log('cookie_consent_manager_dismissed', getLogState(initialTrackingPreference));
    onClose();
  }, [setTrackingPreference, initialTrackingPreference, log, onClose, getLogState]);

  return (
    <Modal close={handleClose} isOpen={isOpen} title={formatMessage(messages.modalTitle)}>
      <Container>
        <Text>
          {formatMessage(messages.modalDescription, {
            link: (node: React.ReactNode) => CookieLink(node, link),
          })}
        </Text>
        <Spacer size="md" />
        <CategoryContainer>
          {TRACKER_CATEGORIES.map((t) => (
            <CheckBoxContainer key={t}>
              <CheckBox
                disabled={requiredCategories.includes(t)}
                checked={state.consent.includes(t)}
                onChange={(val: boolean) => dispatch({ name: t, value: val })}
              >
                <CategoryLabel name={t} />
              </CheckBox>
            </CheckBoxContainer>
          ))}
        </CategoryContainer>
        <Spacer size="lg" />
        <ButtonContainer>
          <Button onClick={handleSave} large>
            {formatMessage(messages.saveCTA)}
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

export function CookiePreferencesModalWithProviders({
  theme,
  useTranslations,
  ...restProps
}: {
  theme?: Theme;
  useTranslations?: () => [boolean, Record<string, string>];
} & Props) {
  return (
    <UIProviders theme={theme || defaultTheme} useTranslations={useTranslations}>
      <CookiePreferencesModal {...restProps} />
    </UIProviders>
  );
}

const CheckBoxContainer = styled.div`
  width: 50%;
  margin-bottom: ${({ theme }) => theme.size.md};
  @media (max-width: ${({ theme }) => theme.breakpoints.phone}px) {
    width: 100%;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 560px;
`;

export default memo(CookiePreferencesModal);
