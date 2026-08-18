export type SiteVersionName = 'current' | '1.0';

export function getSiteVersionFromPath(
  pathname: string,
): SiteVersionName | null {
  if (/^\/v1(?:\/|$)/.test(pathname) || /^\/docs\/v1(?:\/|$)/.test(pathname)) {
    return '1.0';
  }

  if (/^\/v2(?:\/|$)/.test(pathname) || /^\/docs\/v2(?:\/|$)/.test(pathname)) {
    return 'current';
  }

  return pathname === '/' ? 'current' : null;
}

export function getHomepagePath(versionName: SiteVersionName): string {
  return versionName === '1.0' ? '/v1/' : '/v2/';
}
