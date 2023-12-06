import { getDomainWithoutSubdomain } from './getDomain';

describe('getDomain', () => {
  it('returns the correct domain', () => {
    Object.defineProperty(window, 'location', {
      value: { hostname: 'www.coinbase.com' },
      writable: true,
    });
    expect(getDomainWithoutSubdomain()).toEqual('.coinbase.com');
    window.location.hostname = 'pro.coinbase.com';
    expect(getDomainWithoutSubdomain()).toEqual('.coinbase.com');
    window.location.hostname = 'coinbase-dev.cbhq.net';

    expect(getDomainWithoutSubdomain()).toEqual('.cbhq.net');
  });
});
