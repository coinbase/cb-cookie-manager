import { useTrackingManager } from 'cb-cookie-manager';
import React, { memo, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled, { css } from 'styled-components';

import { TRANSITION_TIME_MS } from '../constants';
import useIsVisibleWithTransition from '../hooks/useIsVisibleWithTransition';
import useMessages from '../hooks/useMessages';
import Button from './Button';
import CloseIcon from './CloseIcon';
import PrivacyLink from './PrivacyLink';
import Spacer from './Spacer';

const CookieLink = (str: React.ReactNode, link?: string): React.ReactNode[] => [
  <PrivacyLink key="CookieLink" link={link}>
    {str}
  </PrivacyLink>,
];

type Props = {
  onDismiss: (() => void) | undefined;
  onAccept: () => void;
  showPreferencesModal: () => void;
  hasDismissed: boolean;
  link?: string;
};

function BannerContent({ onDismiss, onAccept, showPreferencesModal, hasDismissed, link }: Props) {
  const { log } = useTrackingManager();

  const [isVisible, closeWithTransition] = useIsVisibleWithTransition(!hasDismissed, 100);
  useEffect(() => {
    if (!hasDismissed) {
      log('cookie_consent_footer_viewed');
    }
  }, []);

  const handleDismiss = useCallback(() => {
    log('cookie_consent_footer_dismissed');
    closeWithTransition(onDismiss);
  }, [closeWithTransition, onDismiss, log]);

  const handleClick = useCallback(() => {
    closeWithTransition(onAccept);
  }, [closeWithTransition, onAccept]);

  const { formatMessage } = useIntl();
  const messages = useMessages();

  if (hasDismissed) {
    return null;
  }
  return (
    <Container visible={isVisible}>
      <MobileDismissButton
        onClick={handleDismiss}
        aria-label={formatMessage(messages.bannerDismissCTA)}
      >
        <CloseIcon inverted size="10" />
      </MobileDismissButton>
      <DescriptionText>
        {formatMessage(messages.defaultBannerDescription, {
          link: (node: React.ReactNode) => CookieLink(node, link),
          button: (node: React.ReactNode) => [
            <ManageSettingsButton
              key="ManageCookieSettingsBtn"
              onClick={showPreferencesModal}
              aria-haspopup={true}
            >
              {node}
            </ManageSettingsButton>,
          ],
        })}
      </DescriptionText>
      <CTA>
        <SettingsCTA onClick={showPreferencesModal}>
          {formatMessage(messages.bannerSettingsCTA)}
        </SettingsCTA>
        <Spacer size="md" vertical />
        <Button onClick={handleClick}>{formatMessage(messages.bannerMainCTA)}</Button>
      </CTA>
      <DesktopDismissButton
        onClick={handleDismiss}
        aria-label={formatMessage(messages.bannerDismissCTA)}
      >
        <CloseIcon inverted size="10" />
      </DesktopDismissButton>
    </Container>
  );
}
export default memo(BannerContent);

const DismissButton = styled.button`
  background-color: ${({ theme }) => theme.colors.onBackgroundMuted};
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  padding: 0;
  cursor: pointer;
`;

const MobileDismissButton = styled(DismissButton)`
  ${({ theme }) => css`
    display: none;
    @media (max-width: ${theme.breakpoints.tablet}px) {
      display: flex;
      align-self: flex-end;
      margin: ${theme.size.xs} 0;
    }
  `}
`;

const DesktopDismissButton = styled(DismissButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    display: none;
  }
`;

const CTA = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-right: ${theme.size.lg};
    @media (max-width: ${theme.breakpoints.tablet}px) {
      margin-right: 0;
    }
  `}
`;

const SettingsCTA = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: transparent;
  border: none;
  white-space: nowrap;
  cursor: pointer;
`;

const DescriptionText = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    width: 734px;
    line-height: 23px;
    margin-right: ${theme.size.lg};

    @media (max-width: ${theme.breakpoints.tablet}px) {
      width: auto;
      margin-right: 0;
      margin-bottom: ${theme.size.md};
    }
  `}
`;

const Container = styled.div<{ visible: boolean }>`
  ${({ theme, visible }) => css`
    display: flex;
    align-items: center;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${theme.colors.backgroundMuted};
    z-index: ${theme.zIndex.overlay};
    color: ${theme.colors.onBackgroundMuted};
    padding: ${`${theme.size.md} 60px ${theme.size.md} 160px`};
    justify-content: space-between;
    ${visible ? 'bottom: 0' : 'bottom: -140px'};
    transition: bottom ${TRANSITION_TIME_MS}ms;
    @media (max-width: ${theme.breakpoints.tablet}px) {
      flex-direction: column;
      padding: ${`0 ${theme.size.md} ${theme.size.md}`};
      ${visible ? 'bottom: 0' : 'bottom: -200px'};
    }
  `}
`;

const ManageSettingsButton = styled.button`
  background: transparent;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.onBackgroundMuted};
`;

// TODO: Support dark mode
