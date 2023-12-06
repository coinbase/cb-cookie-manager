import { Tracker } from '../types';

const trackerMatches = (tracker: Tracker, id: string) => {
  if (tracker.regex) {
    const re = new RegExp(tracker.regex);
    return re.test(id);
  } else {
    return tracker.id === id;
  }
};

export default trackerMatches;
