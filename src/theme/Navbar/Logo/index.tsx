import React from 'react';
import Link from '@docusaurus/Link';
import {
  useActiveDocContext,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig, type NavbarLogo as NavbarLogoConfig} from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import {
  getHomepagePath,
  getSiteVersionFromPath,
  type SiteVersionName,
} from '@site/src/utils/siteVersion';

function LogoImage({
  logo,
  alt,
}: {
  logo: NavbarLogoConfig;
  alt: string;
}): JSX.Element {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  return (
    <div className="navbar__logo">
      <ThemedImage
        className={logo.className}
        sources={sources}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
      />
    </div>
  );
}

export default function NavbarLogo(): JSX.Element {
  const {pathname} = useLocation();
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const {
    navbar: {title: navbarTitle, logo},
  } = useThemeConfig();
  const activeDocContext = useActiveDocContext('default');
  const {preferredVersion} = useDocsPreferredVersion('default');
  const versionName: SiteVersionName =
    getSiteVersionFromPath(pathname) ??
    (activeDocContext.activeVersion?.name as SiteVersionName | undefined) ??
    (preferredVersion?.name as SiteVersionName | undefined) ??
    'current';
  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link className="navbar__brand" to={getHomepagePath(versionName)}>
      {logo && <LogoImage logo={logo} alt={alt} />}
      {navbarTitle != null && (
        <b className="navbar__title text--truncate">{navbarTitle}</b>
      )}
    </Link>
  );
}
