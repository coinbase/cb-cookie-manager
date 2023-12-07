import {
  Provider,
  Region,
  TrackingCategory,
  TrackingPreference,
  useSavedTrackingPreference,
} from '@coinbase/cookie-manager';
import { act, renderHook } from '@testing-library/react';
import React from 'react';

import config from '../examples/config';
import { useBanner } from './CookieBanner';

jest.mock('@coinbase/cookie-manager', () => {
  const originalModule = jest.requireActual('@coinbase/cookie-manager');

  return {
    __esModule: true,
    ...originalModule,
    useSavedTrackingPreference: jest.fn(),
  };
});

describe('useBanner', () => {
  const onError = jest.fn();
  let onPreferenceChange: jest.Mock;
  let region: Region = Region.DEFAULT;
  const renderTestHook = () =>
    renderHook(() => useBanner(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider
          onError={onError}
          config={config}
          locale="en"
          projectName="consumer-www"
          region={region}
          onPreferenceChange={onPreferenceChange}
          log={console.log}
        >
          {children}
        </Provider>
      ),
    });

  beforeEach(() => {
    onPreferenceChange = jest.fn();
  });

  it('displays banner', () => {
    const { result } = renderTestHook();
    expect(result.current.hasDismissed).toEqual(false);
  });

  it('does not display banner', async () => {
    const mockUseSavedTrackingPreference = useSavedTrackingPreference as jest.MockedFunction<
      typeof useSavedTrackingPreference
    >;

    const preference: TrackingPreference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.NECESSARY, TrackingCategory.PERFORMANCE],
    };
    mockUseSavedTrackingPreference.mockImplementation(jest.fn(() => preference));
    const { result } = renderTestHook();

    expect(result.current.hasDismissed).toEqual(true);
  });

  it('opens and closes modal', () => {
    const { result } = renderTestHook();

    expect(result.current.isModalOpen).toEqual(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.isModalOpen).toEqual(true);
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isModalOpen).toEqual(false);
  });

  it('dismiss modal and set default tracking preference for optOut region', async () => {
    const mockUseSavedTrackingPreference = useSavedTrackingPreference as jest.MockedFunction<
      typeof useSavedTrackingPreference
    >;

    mockUseSavedTrackingPreference.mockImplementation(jest.fn(() => undefined));
    const { result } = renderTestHook();
    act(() => {
      result.current.handleBannerDismiss();
    });
    expect(result.current.isModalOpen).toEqual(false);
    expect(onPreferenceChange.mock.calls[1][0]).toEqual({
      consent: ['necessary', 'performance', 'functional', 'targeting'],
      region: 'DEFAULT',
    });
  });

  it('dismiss modal and does not set default tracking preference for optIn region', () => {
    region = Region.EU;
    const { result } = renderTestHook();
    act(() => {
      result.current.handleBannerDismiss();
    });
    expect(result.current.isModalOpen).toEqual(false);
    expect(onPreferenceChange).toHaveBeenCalledTimes(1);
  });

  it('dismiss modal and does not set default tracking preference if user has already given their preference', () => {
    const mockUseSavedTrackingPreference = useSavedTrackingPreference as jest.MockedFunction<
      typeof useSavedTrackingPreference
    >;

    const preference: TrackingPreference = {
      region: Region.DEFAULT,
      consent: [TrackingCategory.NECESSARY, TrackingCategory.PERFORMANCE],
    };
    mockUseSavedTrackingPreference.mockImplementation(jest.fn(() => preference));

    const { result, rerender } = renderTestHook();

    act(() => {
      rerender();
    });

    act(() => {
      result.current.handleBannerDismiss();
    });
    expect(onPreferenceChange).toHaveBeenCalledTimes(1);
  });

  it('accept modal sets default tracking preference', () => {
    region = Region.EU;
    const { result } = renderTestHook();
    act(() => {
      result.current.handleAcceptAll();
    });

    expect(result.current.isModalOpen).toEqual(false);
    expect(onPreferenceChange.mock.calls[1][0]).toEqual({
      consent: ['necessary', 'performance', 'functional', 'targeting'],
      region: 'EU',
    });
  });
});
