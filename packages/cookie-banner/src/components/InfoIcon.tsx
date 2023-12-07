import React from 'react';
import styled from 'styled-components';

type Props = { className?: string };

function Icon({ className }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 0C3.59 0 0 3.59 0 8C0 12.41 3.59 16 8 16C12.41 16 16 12.41 16 8C16 3.59 12.41 0 8 0ZM8 15C4.14 15 1 11.86 1 8C1 4.14 4.14 1 8 1C11.86 1 15 4.14 15 8C15 11.86 11.86 15 8 15Z"
        fill="#718598"
      />
      <path d="M8.5 7.5H7.5V12H8.5V7.5Z" fill="#718598" />
      <path d="M8.5 4H7.5V6H8.5V4Z" fill="#718598" />
    </svg>
  );
}

export default styled(Icon)`
  cursor: pointer;
`;
