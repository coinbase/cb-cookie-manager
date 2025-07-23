import { useTrackingManager } from '@coinbase/cookie-manager';
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

const CookieLink = (str: React.ReactNode, link?: string, className?: string): React.ReactNode[] => [
  <PrivacyLink key="CookieLink" link={link} className={className}>
    {str}
  </PrivacyLink>,
];

type Props = {
  onDismiss: (() => void) | undefined;
  onAccept: () => void;
  showPreferencesModal: () => void;
  hasDismissed: boolean;
  link?: string;
  companyName: string;
  classNames?: {
    container?: string;
    primaryCta?: string;
    secondaryCta?: string;
    cookieLink?: string;
  };
};

function BannerContent({
  onDismiss,
  onAccept,
  showPreferencesModal,
  hasDismissed,
  link,
  companyName,
  classNames,
}: Props) {
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
    <Container visible={isVisible} className={classNames?.container}>
      <MobileHeader>
        <div>{formatMessage(messages.defaultBannerTitle)}</div>
        <MobileDismissButton
          onClick={handleDismiss}
          aria-label={formatMessage(messages.bannerDismissCTA)}
        >
          <CloseIcon inverted size="10" />
        </MobileDismissButton>
      </MobileHeader>
      <DescriptionText>
        {formatMessage(messages.defaultBannerDescription, {
          link: (node: React.ReactNode) => CookieLink(node, link, classNames?.cookieLink),
          span: () => <span key="span">{companyName}</span>,
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
        <SettingsCTA onClick={showPreferencesModal} className={classNames?.secondaryCta}>
          {formatMessage(messages.bannerSettingsCTA)}
        </SettingsCTA>
        <Spacer size="md" vertical />
        <MainCtaButton onClick={handleClick} className={classNames?.primaryCta}>
          {formatMessage(messages.bannerMainCTA)}
        </MainCtaButton>
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

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: ${({ theme }) => theme.fontSize.sm};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    display: none;
  }
`;

const MainCtaButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: 100%;
  }
`;

const DismissButton = styled.button`
  background-color: ${({ theme }) => theme.colors.onBackgroundMuted};
  border: none;
  border-radius: 2px;
  width: 20px;
  height: 20px;
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
    }
  `}
`;

const DesktopDismissButton = styled(DismissButton)`
  display: flex;
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
      width: 100%;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    width: 100%;
  }
`;

const DescriptionText = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.sm};
    line-height: ${theme.lineHeight?.sm || '23px'};
    margin-right: ${theme.size.lg};

    @media (max-width: ${theme.breakpoints.tablet}px) {
      width: auto;
      margin-right: 0;
      margin-bottom: ${theme.gutters?.vertical?.md || theme.size.md};
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
    padding: ${`${theme.gutters?.vertical?.md || theme.size.md} ${
      theme.gutters?.horizontal?.md || '60px'
    }`};
    justify-content: space-between;
    ${visible ? 'bottom: 0' : 'bottom: -140px'};
    transition: bottom ${TRANSITION_TIME_MS}ms;
    @media (max-width: ${theme.breakpoints.tablet}px) {
      flex-direction: column;
      padding: ${`${theme.gutters?.vertical?.sm || theme.size.md} ${
        theme.gutters?.horizontal?.sm || theme.size.md
      }`};
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
