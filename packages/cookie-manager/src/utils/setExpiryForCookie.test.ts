import config from '../examples/config';
import setExpiryForCookie from './setExpiryForCookie';

describe('setExpiryForCookie', () => {
  it('returns undefined when no cookie config is found', () => {
    expect(setExpiryForCookie('cookieName', config)).toEqual(undefined);
  });
  it('returns expiry when cookie config has an expiry', () => {
    expect(setExpiryForCookie('cookieName', config)).toEqual({
      expires: new Date('2038-01-01T00:00:00.000Z'),
    });
  });
  it('returns expiry when cookie is in a category with an expiry', () => {
    const expiration = new Date();
    expect(setExpiryForCookie('cookieName', config)).toEqual({
      expires: expiration.getDate() + 365,
    });
  });
});
