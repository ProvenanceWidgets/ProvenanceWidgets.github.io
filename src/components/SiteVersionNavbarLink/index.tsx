import React from 'react';
import {
  useActiveDocContext,
  useDocsPreferredVersion,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {
  getShowcasePath,
  getSiteVersionFromPath,
  type SiteVersionName,
} from '@site/src/utils/siteVersion';

import type {Props as DefaultNavbarItemProps} from '@theme/NavbarItem/DefaultNavbarItem';

type Props = Omit<DefaultNavbarItemProps, 'to'> & {
  target: 'docs' | 'showcase';
};

export default function SiteVersionNavbarLink({
  target,
  ...props
}: Props): JSX.Element {
  const {pathname, search} = useLocation();
  const activeDocContext = useActiveDocContext('default');
  const versions = useVersions('default');
  const {preferredVersion} = useDocsPreferredVersion('default');
  const versionName: SiteVersionName =
    getSiteVersionFromPath(pathname, search) ??
    (activeDocContext.activeVersion?.name as SiteVersionName | undefined) ??
    (preferredVersion?.name as SiteVersionName | undefined) ??
    'current';
  const version =
    versions.find(candidate => candidate.name === versionName) ?? versions[0];
  const mainDoc = version.docs.find(doc => doc.id === version.mainDocId)!;
  const to = target === 'docs' ? mainDoc.path : getShowcasePath(versionName);

  return (
    <DefaultNavbarItem
      {...props}
      to={to}
      isActive={() =>
        target === 'docs'
          ? /^\/docs\/(?:sw|pw)(?:\/|$)/.test(pathname)
          : /^(?:\/sw|\/pw)\/showcase(?:\/|$)/.test(pathname)
      }
    />
  );
}
