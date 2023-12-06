import Cookies from 'js-cookie';

import getAllCookies from './getAllCookies';

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
      consent: ['necessary', 'performance'],
    };
    const cookies = {
      cm_default_preferences: JSON.stringify(value),
      some_cookie: 'iamastring',
      another_cookie: '5',
      array_cookie: JSON.stringify(['item1', 'item2']),
    };
    mockGet.mockImplementation(jest.fn(() => cookies));
    expect(getAllCookies({})).toEqual({
      cm_default_preferences: value,
      some_cookie: 'iamastring',
      another_cookie: 5,
      array_cookie: ['item1', 'item2'],
    });
  });
});
