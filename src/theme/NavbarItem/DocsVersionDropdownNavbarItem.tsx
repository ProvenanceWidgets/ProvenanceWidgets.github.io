import React, {useEffect} from 'react';
import {
  useActiveDocContext,
  useDocsPreferredVersion,
  useDocsVersionCandidates,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {
  getHomepagePath,
  getSiteVersionFromPath,
  type SiteVersionName,
} from '@site/src/utils/siteVersion';

import type {
  ActiveDocContext,
  GlobalDoc,
  GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import type {LinkLikeNavbarItemProps} from '@theme/NavbarItem';
import type {Props} from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';

function getVersionMainDoc(version: GlobalVersion): GlobalDoc {
  return version.docs.find(doc => doc.id === version.mainDocId)!;
}

function getVersionTargetDoc(
  version: GlobalVersion,
  activeDocContext: ActiveDocContext,
): GlobalDoc {
  return (
    activeDocContext.alternateDocVersions[version.name] ??
    getVersionMainDoc(version)
  );
}

function getSiteVersionName(version: GlobalVersion): SiteVersionName {
  return version.name === '1.0' ? '1.0' : 'current';
}

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): JSX.Element | null {
  const {pathname, search, hash} = useLocation();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const versionCandidates = useDocsVersionCandidates(docsPluginId);
  const {preferredVersion, savePreferredVersionName} =
    useDocsPreferredVersion(docsPluginId);
  const isVersionedHome =
    pathname === '/' || /^\/(?:v2|v1)\/?$/.test(pathname);
  const isShowcase = /^\/showcase(?:\/|$)/.test(pathname);
  const pageVersionName =
    getSiteVersionFromPath(pathname) ??
    (activeDocContext.activeVersion?.name as SiteVersionName | undefined) ??
    (preferredVersion?.name as SiteVersionName | undefined) ??
    'current';
  const pageVersion =
    versions.find(version => version.name === pageVersionName) ??
    versionCandidates[0];

  useEffect(() => {
    if (
      !isShowcase &&
      pageVersion &&
      pageVersion.name !== preferredVersion?.name
    ) {
      savePreferredVersionName(pageVersion.name);
    }
  }, [
    pageVersion,
    preferredVersion,
    savePreferredVersionName,
    isShowcase,
  ]);

  if (isShowcase) {
    return null;
  }

  function versionToLink(version: GlobalVersion): LinkLikeNavbarItemProps {
    if (isVersionedHome) {
      return {
        label: version.label,
        to: `${getHomepagePath(getSiteVersionName(version))}${hash}`,
        isActive: () => version.name === pageVersion.name,
        onClick: () => savePreferredVersionName(version.name),
      };
    }

    const targetDoc = getVersionTargetDoc(version, activeDocContext);
    return {
      label: version.label,
      to: `${targetDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  }

  const items: LinkLikeNavbarItemProps[] = [
    ...dropdownItemsBefore,
    ...versions.map(versionToLink),
    ...dropdownItemsAfter,
  ];
  const dropdownVersion = pageVersion;
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
          id: 'theme.navbar.mobileVersionsDropdown.label',
          message: 'Versions',
          description: 'The label for the navbar versions dropdown on mobile view',
        })
      : dropdownVersion.label;
  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : isVersionedHome
        ? getHomepagePath(getSiteVersionName(dropdownVersion))
        : getVersionTargetDoc(dropdownVersion, activeDocContext).path;

  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
      />
    );
  }

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}
