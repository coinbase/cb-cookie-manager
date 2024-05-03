import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import Cookies from 'js-cookie';
import React from 'react';

import config from './examples/config';
import { Provider } from './TrackingManagerContext';
import { Region } from './types';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('CookieContext', () => {
  const log = jest.fn();
  let shadowMode = false;
  const region = Region.DEFAULT;
  const cookies = {
    some_cookie: JSON.stringify('value1'),
    locale: JSON.stringify('value3'),
    cgl_prog: JSON.stringify('value5'),
    cm_default_preferences: JSON.stringify({
      region: Region.DEFAULT,
      consent: ['performance'],
    }),
  };

  let onPreferenceChange: jest.Mock;

  const renderFormHook = () =>
    renderHook(() => {}, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider
          onError={jest.fn()}
          config={config}
          locale="en"
          projectName="consumer-www"
          region={region}
          log={log}
          shadowMode={shadowMode}
          onPreferenceChange={onPreferenceChange}
        >
          {children}
        </Provider>
      ),
    });

  beforeEach(() => {
    onPreferenceChange = jest.fn();
  });

  it('removes the right cookies on mount', async () => {
    const remove = jest.fn();
    const mockGet = Cookies.get as jest.MockedFunction<typeof Cookies.get>;
    const mockRemove = Cookies.remove as jest.MockedFunction<typeof Cookies.remove>;

    // @ts-expect-error: Mocking Cookies.get
    mockGet.mockImplementation(jest.fn(() => cookies));

    mockRemove.mockImplementation(remove);

    const { rerender } = renderFormHook();
    expect(remove).toHaveBeenCalledTimes(2);

    ['cgl_prog'].forEach((cookie) => {
      expect(remove).toHaveBeenCalledWith(cookie, { domain: 'localhost', path: '/' });
    });

    act(() => {
      rerender();
    });
    expect(remove).toHaveBeenCalledTimes(2);
    expect(onPreferenceChange).toHaveBeenCalledTimes(1);
  });

  xit('does not remove cookies in shadow mode', async () => {
    const remove = jest.fn();
    shadowMode = true;
    const mockGet = Cookies.get as jest.MockedFunction<typeof Cookies.get>;
    const mockRemove = Cookies.remove as jest.MockedFunction<typeof Cookies.remove>;

    // @ts-expect-error: Mocking Cookies.get
    mockGet.mockImplementation(jest.fn(() => cookies));

    mockRemove.mockImplementation(remove);

    const { rerender } = renderFormHook();

    expect(remove).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('Cookie does not have consent and will be removed', {
      cookie: 'cgl_prog',
    });

    act(() => {
      rerender();
    });
    expect(remove).not.toHaveBeenCalled();
    expect(onPreferenceChange).toHaveBeenCalledTimes(1);
  });
});
