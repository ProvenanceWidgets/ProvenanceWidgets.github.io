export type SiteVersionName = 'current' | '1.0';

export function getSiteVersionFromPath(
  pathname: string,
  search = '',
): SiteVersionName | null {
  if (/^\/pw(?:\/|$)/.test(pathname) || /^\/docs\/pw(?:\/|$)/.test(pathname)) {
    return '1.0';
  }

  if (/^\/sw(?:\/|$)/.test(pathname) || /^\/docs\/sw(?:\/|$)/.test(pathname)) {
    return 'current';
  }

  if (pathname.startsWith('/docs/showcase')) {
    return new URLSearchParams(search).get('version') === '1.0'
      ? '1.0'
      : 'current';
  }

  return pathname === '/' ? 'current' : null;
}

export function getHomepagePath(versionName: SiteVersionName): string {
  return versionName === '1.0' ? '/pw/' : '/sw/';
}

export function getShowcasePath(versionName: SiteVersionName): string {
  return versionName === '1.0' ? '/pw/showcase/' : '/sw/showcase/';
}
