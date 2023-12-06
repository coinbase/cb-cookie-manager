import styled, { css } from 'styled-components';

export default styled.button<{ large?: boolean }>`
  ${({ theme, large }) => css`
    background-color: ${theme.colors.primary};
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.onPrimary};
    padding: ${large ? `${theme.size.sm} ${theme.size.md}` : `${theme.size.xs} ${theme.size.md}`};
    border: ${theme.border.border};
    border-color: ${theme.colors.primary};
    border-radius: ${theme.border.borderRadius};
    width: ${large ? '100%' : 'fit-content'};
    cursor: pointer;
    white-space: nowrap;
  `}
`;
