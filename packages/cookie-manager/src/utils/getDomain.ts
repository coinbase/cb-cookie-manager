export function getHostname(): string | undefined {
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
}

export function getDomainWithoutSubdomain(): string | undefined {
  const hostname = getHostname();
  if (!hostname) {
    return;
  }

  if (hostname === 'localhost') {
    return hostname;
  }

  const [, ...domain] = hostname.split('.');
  return `.${domain.join('.')}`;
}
