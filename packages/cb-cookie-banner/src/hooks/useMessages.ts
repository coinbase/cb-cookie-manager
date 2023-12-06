import { useTrackingManager } from 'cb-cookie-manager';

import messages from '../utils/messages';

const useMessages = () => {
  const { region } = useTrackingManager();
  if (region === 'EU') return messages.euMessages;
  return messages.defaultMessages;
};

export default useMessages;
