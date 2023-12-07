import { Provider, Region } from '@coinbase/cookie-manager';
import { renderHook } from '@testing-library/react';
import React from 'react';

import config from '../examples/config';
import messages from '../utils/messages';
import useMessages from './useMessages';

describe('useMessages', () => {
  it('returns messages based on region', () => {
    const log = jest.fn();
    const shadowMode = false;
    const region = Region.EU;

    let onPreferenceChange: jest.Mock;
    const renderFormHook = () =>
      renderHook(() => useMessages(), {
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

    const { result } = renderFormHook();
    expect(result.current).toEqual(messages.euMessages);
  });
});
