import { forwardRef } from 'react';
import React from 'react';
import styled from 'styled-components';

type Props = {
  content: React.ReactNode;
};

const TooltipContent = forwardRef(function TooltipContentWithRef(
  { content }: Props,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <ToolTipContainer>
      <Tip ref={ref}>
        <Arrow />
        <TooltipText>{content}</TooltipText>
      </Tip>
    </ToolTipContainer>
  );
});

export const ARROW_DISTANCE = 18;
export const ARROW_SIZE = 16;

const ToolTipContainer = styled.div`
  position: relative;
`;

const Tip = styled.div`
  position: absolute;
  bottom: ${ARROW_DISTANCE}px;
  max-width: 330px;
  min-height: 90px;
  background-color: ${({ theme }) => theme.colors.onBackground};
  border-radius: ${({ theme }) => theme.border.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.onBackground};
  padding: 12px;
  width: max-content;
`;

const TooltipText = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.background};
`;

const Arrow = styled.div`
  position: absolute;
  bottom: -${ARROW_DISTANCE - 1}px;
  left: calc(50% - ${ARROW_SIZE / 2}px);
  width: 0;
  height: 0;
  border-left: ${ARROW_SIZE}px solid transparent;
  border-right: ${ARROW_SIZE}px solid transparent;
  border-top: ${ARROW_DISTANCE}px solid ${({ theme }) => theme.colors.onBackground};
`;

export default TooltipContent;
