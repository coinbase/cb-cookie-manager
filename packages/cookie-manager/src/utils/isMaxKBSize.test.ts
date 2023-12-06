import isMaxKBSize from './isMaxKBSize';

describe('isMaxKBSize', () => {
  it('returns true when string exceeds max kb size', () => {
    expect(isMaxKBSize('helloooooooo', 0.01)).toEqual(true);
  });
  it('returns false when string does not max kb size', () => {
    expect(isMaxKBSize('hello', 0.01)).toEqual(false);
  });
});
