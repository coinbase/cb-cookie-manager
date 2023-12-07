import { act, renderHook } from '@testing-library/react';
import { log } from 'console';
import Cookies from 'js-cookie';
import React from 'react';

import config from '../examples/config';
import { Provider } from '../TrackingManagerContext';
import { Region, TrackingCategory } from '../types';
import useSetTrackingPreference from './useSetTrackingPreference';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('useSetTrackingPreference', () => {
  const onError = jest.fn();
  const onPreferenceChange = jest.fn();
  const region = Region.DEFAULT;
  const renderFormHook = () =>
    renderHook(() => useSetTrackingPreference(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider
          onError={onError}
          config={config}
          locale="en"
          projectName="consumer-www"
          region={region}
          log={log}
          onPreferenceChange={onPreferenceChange}
        >
          {children}
        </Provider>
      ),
    });

  it('adds required category if not set', () => {
    const { result } = renderFormHook();
    act(() => {
      result.current({
        region: Region.DEFAULT,
        consent: [TrackingCategory.FUNCTIONAL],
      });
    });

    expect(onError).toHaveBeenCalled();
    expect(onPreferenceChange).toHaveBeenCalledWith({
      region: 'DEFAULT',
      consent: ['functional', 'necessary'],
    });
  });

  it('sets new consent', () => {
    const mockGet = Cookies.get as jest.MockedFunction<typeof Cookies.get>;

    mockGet.mockImplementation(() => ({
      cm_default_preferences: JSON.stringify({
        region: Region.DEFAULT,
        consent: [TrackingCategory.NECESSARY, TrackingCategory.PERFORMANCE],
      }),
    }));

    const { result } = renderFormHook();
    const newPreference = {
      region: Region.DEFAULT,
      consent: [
        TrackingCategory.NECESSARY,
        TrackingCategory.PERFORMANCE,
        TrackingCategory.FUNCTIONAL,
      ],
    };
    act(() => {
      result.current(newPreference);
    });

    expect(onPreferenceChange).toHaveBeenCalledWith(newPreference);
  });
});
