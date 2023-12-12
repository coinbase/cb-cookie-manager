import { Region, useTrackingManager } from '@coinbase/cookie-manager';

import messages from '../utils/messages';

const useMessages = () => {
  const { region } = useTrackingManager();
  if (region === Region.EU) return messages.euMessages;
  return messages.defaultMessages;
};

export default useMessages;
