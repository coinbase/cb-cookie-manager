import config from '../examples/config';
import getTrackerInfo from './getTrackerInfo';

describe('getTrackerInfo', () => {
  it('should return undefined if tracker is not found', () => {
    expect(getTrackerInfo('unknown', config)).toBeUndefined();
  });
  it('should return tracker info if tracker is found', () => {
    expect(getTrackerInfo('locale', config)).toEqual({ id: 'locale', type: 'cookie' });
  });
});
