export function getGpc(gpcHeaderValue?: boolean): boolean {
  const header = gpcHeaderValue == null ? false : gpcHeaderValue;

  if (header) {
    // honor the Set-GPC header if it's set to true
    return true;
  }

  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    // if we don't have access to the window.navigator return the header value
    // if present, false otherwise
    return header;
  }

  if (!(window.navigator as any).globalPrivacyControl) {
    return false;
  }
  return true;
}

export default getGpc;
