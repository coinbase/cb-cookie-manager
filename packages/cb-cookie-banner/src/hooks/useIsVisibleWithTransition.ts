import { useCallback, useEffect, useState } from 'react';

import { TRANSITION_TIME_MS } from '../constants';

const useIsVisibleWithTransition = (
  isOpen: boolean,
  transitionTime = TRANSITION_TIME_MS
): [boolean, (close?: () => void) => void] => {
  const [isVisible, setIsVisible] = useState(!isOpen);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(isOpen);
    }, transitionTime);
    return () => clearTimeout(timeout);
  }, [isOpen, transitionTime]);

  const handleClose = useCallback(
    async (close?: () => void) => {
      setIsVisible(false);
      if (close) {
        await setTimeout(close, transitionTime);
      }
    },
    [transitionTime]
  );

  return [isVisible, handleClose];
};

export default useIsVisibleWithTransition;
