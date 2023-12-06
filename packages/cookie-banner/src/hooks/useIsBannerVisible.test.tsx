import {
  Region,
  TrackingCategory,
  TrackingPreference,
  useSavedTrackingPreference,
} from '@coinbase/cookie-manager';
import { renderHook } from '@testing-library/react';

import useIsBannerVisible from './useIsBannerVisible';

jest.mock('@coinbase/cookie-manager', () => {
  const originalModule = jest.requireActual('@coinbase/cookie-manager');

  return {
    __esModule: true,
    ...originalModule,
    useSavedTrackingPreference: jest.fn(),
  };
});

describe('useIsBannerVisible', () => {
  it('should return false if the cookie banner is not visible', async () => {
    const renderTestHook = () => renderHook(() => useIsBannerVisible(), {});

    const mockUseSavedTrackingPreference = useSavedTrackingPreference as jest.MockedFunction<
      typeof useSavedTrackingPreference
    >;

    const preference: TrackingPreference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.NECESSARY, TrackingCategory.PERFORMANCE],
    };
    mockUseSavedTrackingPreference.mockImplementation(jest.fn(() => preference));

    const { result } = renderTestHook();
    expect(result.current).toBe(false);
  });

  it('should return true if the cookie banner is visible', () => {
    const renderTestHook = () => renderHook(() => useIsBannerVisible(), {});
    const mockUseSavedTrackingPreference = useSavedTrackingPreference as jest.MockedFunction<
      typeof useSavedTrackingPreference
    >;

    mockUseSavedTrackingPreference.mockImplementation(jest.fn(() => undefined));
    const { result } = renderTestHook();
    expect(result.current).toBe(true);
  });
});
