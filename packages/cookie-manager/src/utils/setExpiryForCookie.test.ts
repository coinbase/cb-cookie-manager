import config from '../examples/config';
import setExpiryForCookie from './setExpiryForCookie';

describe('setExpiryForCookie', () => {
  it('returns undefined when no cookie config is found', () => {
    expect(setExpiryForCookie('cookieName', config)).toEqual(undefined);
  });
  it('returns expiry when cookie config has an expiry', () => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 10);
    expect(setExpiryForCookie('test', config)).toEqual(expiration);
  });
  it('returns expiry when cookie is in a category with an expiry', () => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 365);
    expect(setExpiryForCookie('some_cookie', config)).toEqual(expiration);
  });
  it('returns undefined when cookie is a session cookie', () => {
    expect(setExpiryForCookie('mode', config)).toEqual(undefined);
  });
});
