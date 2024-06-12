import getGpc from './getGpc';

describe('getGpc', () => {
  it('honors navigator.globalPrivacyControl', () => {
    (navigator as any).globalPrivacyControl = true;
    expect(getGpc()).toEqual(true);
  });

  it('honors the passed header value when passed', () => {
    (navigator as any).globalPrivacyControl = false;
    expect(getGpc(true)).toEqual(true);
  });

  it('returns false by default', () => {
    expect(getGpc()).toEqual(false);
  });
});
