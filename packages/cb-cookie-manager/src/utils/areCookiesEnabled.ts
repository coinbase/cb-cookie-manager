import Cookies from 'js-cookie';

const TEST_COOKIE = 'test_cookie';

const areCookiesEnabled = (): boolean => {
  Cookies.set(TEST_COOKIE, 'test');
  const result = !!Cookies.get(TEST_COOKIE);
  Cookies.remove(TEST_COOKIE);

  return result;
};

export default areCookiesEnabled;
