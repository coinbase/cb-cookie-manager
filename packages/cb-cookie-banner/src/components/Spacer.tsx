import styled from 'styled-components';

import { Theme } from './types';

type SpacerProps = { size: keyof Theme['size']; vertical?: boolean };

const Spacer = styled.div<SpacerProps>`
  ${({ theme, size, vertical }) =>
    vertical
      ? `
        width: ${theme.size[size]};
        height: 100%;
        `
      : `
        height: ${theme.size[size]};
        width: 100%;
      `}
`;

export default Spacer;
