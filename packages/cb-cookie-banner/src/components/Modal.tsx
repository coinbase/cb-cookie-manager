import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { TRANSITION_TIME_MS } from '../constants';
import useIsVisibleWithTransition from '../hooks/useIsVisibleWithTransition';
import CloseIcon from './CloseIcon';

type Props = {
  contentLabel?: string;
  children?: ReactNode;
  close: () => void;
  title?: ReactNode;
  isOpen: boolean;
};

function Modal(props: Props) {
  const { children, close, title, isOpen } = props;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      overlayRef.current = document.createElement('div');
      if (document.body) document.body.appendChild(overlayRef.current);
    }
    return () => {
      if (typeof document !== 'undefined' && document.body) {
        document.body.removeChild(overlayRef.current as Node);
      }
    };
  }, []);

  const [isVisible, closeWithTransition] = useIsVisibleWithTransition(isOpen);
  const handleClose = useCallback(() => {
    closeWithTransition(close);
  }, [closeWithTransition, close]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose]
  );

  if (!overlayRef.current || !isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={handleOverlayClick} visible={isVisible}>
      <ModalContainer ref={modalRef}>
        <ModalHeader close={handleClose} title={title} />
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>,
    overlayRef.current
  );
}

const Overlay = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: scroll;
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity ${TRANSITION_TIME_MS}ms;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

type ModalHeaderProps = {
  title?: string | React.ReactNode;
  close?: () => void;
};

export function ModalHeader({ title, close }: ModalHeaderProps) {
  return (
    <Header>
      {title && <Title data-synthetic-id="modal_cookies">{title}</Title>}

      {close && <CloseIcon onClick={close} />}
    </Header>
  );
}

const ModalBody = styled.div`
  display: flex;
  padding: ${({ theme }) => `${theme.size.lg} ${theme.size.md}`};
`;

const Header = styled.div`
  display: flex;
  position: relative;
  min-height: 64px;
  padding: ${(p) => p.theme.size.md};
  border-bottom: ${(p) => p.theme.border.border};
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Title = styled.span`
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.onBackground};
`;

const ModalContainer = styled.div`
  height: auto;
  margin: 100px 0 24px;
  min-width: 480px;
  border: none;
  border-radius: ${({ theme }) => theme.border.borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.phone}px) {
    min-width: auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 0;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

export default Modal;
