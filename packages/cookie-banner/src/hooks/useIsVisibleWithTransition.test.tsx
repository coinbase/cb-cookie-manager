import { renderHook } from '@testing-library/react';

import useIsVisibleWithTransition from './useIsVisibleWithTransition';

describe('useIsVisibleWithTransition', () => {
  it('returns false when isVisible is true', () => {
    const { result } = renderHook(() => useIsVisibleWithTransition(true));
    expect(result.current[0]).toEqual(false);
  });

  it('returns true when isVisible is false', () => {
    const { result } = renderHook(() => useIsVisibleWithTransition(false));
    expect(result.current[0]).toEqual(true);
  });
});
