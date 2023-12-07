import 'focus-visible';
import '../styles/font.css';
import '../styles/icon-font.css';

import { css } from 'linaria';

import { borderRadiusVariables } from './borderRadius';
import { borderWidthVariables } from './borderWidth';

export const globalStyles = css`
  :global() {
    *,
    ::before,
    ::after {
      box-sizing: border-box;
      border-style: solid;
      border-width: 0;
    }
    body {
      margin: 0;
      padding: 0;
    }
    html {
      -webkit-text-size-adjust: 100%; /* 2 */
      -webkit-tap-highlight-color: transparent; /* 3*/
    }
    :root {
      ${borderRadiusVariables};
      ${borderWidthVariables}
    }
  }
`;
