import React from 'react';
import styled from 'styled-components';

const CloseIcon = styled(
  ({
    size = '10',
    className,
    onClick,
  }: {
    onClick?: () => void;
    size?: string;
    inverted?: boolean;
    className?: string;
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      onClick={onClick}
    >
      <g>
        <polygon points="17.5 18.5 19.5 17 2 1.5 0.5 3" />
        <polygon points="19.5 1.5 17.5 0.5 0.5 17 2 18.5" />
      </g>
    </svg>
  )
)`
  fill: ${({ inverted, theme }) =>
    inverted ? theme.colors.background : theme.colors.onBackgroundMuted};

  cursor: pointer;
  transition: fill 0.15s ease;

  &:hover {
    fill: ${({ theme, inverted }) =>
      inverted ? theme.colors.background : theme.colors.onBackground};
  }
`;

export default CloseIcon;
