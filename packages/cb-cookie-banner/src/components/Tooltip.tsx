import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import InfoIcon from './InfoIcon';
import TooltipContent, { ARROW_DISTANCE, ARROW_SIZE } from './TooltipContent';

type Props = {
  content: React.ReactNode;
};

export const useTooltip = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState<{ left: number; top: number } | undefined>();

  useEffect(() => {
    if (!tooltipRef.current) return;

    // Only calculate offset once and only when visible
    if (offset || !shouldRender) return;

    const tooltipEl = tooltipRef.current.getBoundingClientRect();

    const newOffset = { left: -tooltipEl.width / 2, top: 0 };

    // Calculate whether tooltip is out of bounds of window
    if (window.innerWidth - tooltipEl.right - newOffset.left < 0) {
      newOffset.left = Math.round(window.innerWidth - tooltipEl.right);
    }

    if (tooltipEl.left + newOffset.left < 0) {
      newOffset.left = Math.round(Math.abs(tooltipEl.left));
    }

    if (window.innerHeight - tooltipEl.bottom < 0) {
      newOffset.top = Math.round(window.innerHeight - tooltipEl.bottom);
    }

    if (tooltipEl.top < 0) {
      newOffset.top = Math.round(Math.abs(tooltipEl.top));
    }
    setOffset(newOffset);
  }, [tooltipRef, shouldRender]);

  return {
    shouldRender,
    setShouldRender,
    tooltipRef,
    offset,
    isVisible: !!(shouldRender && offset),
  };
};

function Tooltip({ content }: Props) {
  const { shouldRender, setShouldRender, offset, tooltipRef, isVisible } = useTooltip();
  return (
    <Container
      onMouseEnter={() => setShouldRender(true)}
      onMouseLeave={() => setShouldRender(false)}
    >
      {shouldRender && (
        <Wrapper
          key="tooltip"
          style={{ left: offset?.left ?? 0, top: offset?.top ?? 0 }}
          visible={isVisible}
        >
          <TooltipContent content={content} ref={tooltipRef} />
        </Wrapper>
      )}
      <InfoIcon />
    </Container>
  );
}

const Container = styled.div`
  /*
  * Invisible extra padding to prevent losing focus as
  * the mouse moves to the tooltip
  */
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: ${ARROW_SIZE}px;
    height: ${ARROW_DISTANCE}px;
    bottom: ${ARROW_DISTANCE}px;
  }
`;

const Wrapper = styled.div<{ visible: boolean }>`
  position: relative;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: opacity 100ms;
`;

export default memo(Tooltip);
