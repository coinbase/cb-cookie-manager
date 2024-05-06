import Cookies from 'js-cookie';

import getAllCookies, { Region } from './getAllCookies';
export { Region } from '../types';

jest.mock('js-cookie', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe('getAllCookies', () => {
  it('deseralizes cookies of all types', () => {
    const mockGet = Cookies.get as jest.MockedFunction<typeof Cookies.get>;
    const value = {
      region: 'DEFAULT',
      consent: ['necessary', 'performance', 'targeting'],
    };
    const cookies = {
      cm_default_preferences: JSON.stringify(value),
      advertising_sharing_allowed: JSON.stringify({ value: true }),
      some_cookie: 'iamastring',
      another_cookie: '5',
      array_cookie: JSON.stringify(['item1', 'item2']),
    };
    (navigator as any).globalPrivacyControl = false;

    mockGet.mockImplementation(jest.fn(() => cookies));

    expect(getAllCookies(Region.DEFAULT, {})).toEqual({
      cm_default_preferences: value,
      advertising_sharing_allowed: { value: true },
      some_cookie: 'iamastring',
      another_cookie: 5,
      array_cookie: ['item1', 'item2'],
    });
  });

  it('applies GCP to cookie values', () => {
    const mockGet = Cookies.get as jest.MockedFunction<typeof Cookies.get>;
    const value = {
      region: 'DEFAULT',
      consent: ['necessary', 'performance', 'targeting'],
    };
    const cookies = {
      cm_default_preferences: JSON.stringify(value),
      advertising_sharing_allowed: JSON.stringify({ value: true }),
      some_cookie: 'iamastring',
      another_cookie: '5',
      array_cookie: JSON.stringify(['item1', 'item2']),
    };
    (navigator as any).globalPrivacyControl = true;

    mockGet.mockImplementation(jest.fn(() => cookies));

    expect(getAllCookies(Region.DEFAULT, {})).toEqual({
      cm_default_preferences: { consent: ['necessary', 'performance'], region: 'DEFAULT' },
      advertising_sharing_allowed: { value: false },
      some_cookie: 'iamastring',
      another_cookie: 5,
      array_cookie: ['item1', 'item2'],
    });
  });
});
