import React, { createContext, useContext } from 'react';

import { CookieProvider } from './CookieContext';
import { TrackingManagerDependencies } from './types';

const TrackingManagerContext = createContext<TrackingManagerDependencies | null>(null);

export const useTrackingManager = (): TrackingManagerDependencies => {
  const options = useContext(TrackingManagerContext);
  if (!options) throw new Error('Cookie Manager Not Provided');
  return options;
};

export function Provider({
  children,
  ...restProps
}: {
  children: React.ReactNode;
} & TrackingManagerDependencies) {
  return (
    <TrackingManagerContext.Provider value={restProps}>
      <CookieProvider>{children}</CookieProvider>
    </TrackingManagerContext.Provider>
  );
}
