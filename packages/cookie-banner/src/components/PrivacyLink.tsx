import React from 'react';
import styled from 'styled-components';

import { palette } from './Palette';

type Props = {
  children: React.ReactNode;
  color?: 'primary' | 'light' | 'foregroundMuted';
  link?: string;
  className?: string;
};

function PrivacyLink({ children, color = 'light', link, className }: Props) {
  return (
    <Link color={color} href={link} target="_blank" rel="noopener" className={className}>
      {children}
    </Link>
  );
}

const Link = styled.a`
  text-decoration: underline;
  color: ${({ theme, color }) =>
    color === 'foregroundMuted'
      ? palette.foregroundMuted
      : color === 'primary'
      ? theme.colors.primary
      : theme.colors.onBackgroundMuted};
  &:visited {
    color: ${({ theme, color }) =>
      color === 'foregroundMuted'
        ? palette.foregroundMuted
        : color === 'primary'
        ? theme.colors.primary
        : theme.colors.onBackgroundMuted};
  }
`;

export default PrivacyLink;
