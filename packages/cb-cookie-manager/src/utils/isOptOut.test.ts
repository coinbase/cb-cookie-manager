import { Region } from '../types';
import isOptOut from './isOptOut';

describe('isOptOut', () => {
  it('uses default rule if there is no rule for a region', () => {
    // @ts-expect-error we are deliberately passing a wrong value
    expect(isOptOut('US')).toEqual(true);
  });

  it('returns the correct value', () => {
    expect(isOptOut(Region.EU)).toEqual(false);
    expect(isOptOut(Region.DEFAULT)).toEqual(true);
  });
});
