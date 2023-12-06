import React from 'react';
import styled from 'styled-components';

import CheckIcon from './CheckIcon';
import Spacer from './Spacer';

type Props = {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
};

function Checkbox({ onChange, disabled, checked, children }: Props) {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <Container>
      <Box disabled={disabled} checked={checked}>
        {checked && <CheckIcon />}
        <Input
          type="checkbox"
          checked={checked}
          onClick={disabled ? undefined : handleClick}
          disabled={disabled}
        />
      </Box>
      <Spacer size="xs" vertical />
      {children}
    </Container>
  );
}

const Input = styled.input`
  position: absolute;
  opacity: 0;
  ${({ disabled }) => (disabled ? '' : 'cursor: pointer;')};
  width: 100%;
  height: 100%;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Box = styled.div<{ disabled?: boolean; checked: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.background};
  ${({ disabled }) => disabled && 'opacity: 50%;'};
  ${({ disabled }) => (disabled ? '' : 'cursor: pointer;')};
  border-radius: 3px;
  border: ${({ theme }) => theme.border.border};
  width: ${({ theme }) => theme.size.md};
  height: ${({ theme }) => theme.size.md};
`;

export default Checkbox;
