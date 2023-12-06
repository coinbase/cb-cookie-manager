import styled from 'styled-components';

const Text = styled.span<{ bold?: boolean }>`
  font-size: ${({ theme }) => theme.size.sm};
  color: ${({ theme }) => theme.colors.onBackground};
  font-weight: ${({ theme, bold }) => (bold ? theme.fontWeight.bold : theme.fontWeight.regular)};
  line-height: 160%;
`;

export default Text;
