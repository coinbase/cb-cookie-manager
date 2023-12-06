import React from 'react';
import styled from 'styled-components';

function Icon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 5.36364L4.75 9L13 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default styled(Icon)`
  fill: ${({ theme }) => theme.colors.onPrimary};
  cursor: pointer;
`;
