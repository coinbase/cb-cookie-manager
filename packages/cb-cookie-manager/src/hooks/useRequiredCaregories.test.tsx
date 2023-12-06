import { renderHook } from '@testing-library/react';
import { log } from 'console';
import React from 'react';

import config from '../examples/config';
import { Provider } from '../TrackingManagerContext';
import { Region } from '../types';
import useRequiredCategories from './useRequiredCategories';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('useRequiredCategories', () => {
  const onError = jest.fn();
  const onPreferenceChange = jest.fn();
  const renderFormHook = () =>
    renderHook(() => useRequiredCategories(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider
          onError={onError}
          config={config}
          locale="en"
          projectName="consumer-www"
          region={Region.DEFAULT}
          log={log}
          onPreferenceChange={onPreferenceChange}
        >
          {children}
        </Provider>
      ),
    });

  it('returns required categories', () => {
    const { result } = renderFormHook();
    expect(result.current).toEqual(['necessary']);
  });
});
