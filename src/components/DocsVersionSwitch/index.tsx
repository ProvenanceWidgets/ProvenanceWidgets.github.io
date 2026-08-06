import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import {
  useActiveDocContext,
  useDocsPreferredVersion,
  useVersions,
  type GlobalVersion,
} from "@docusaurus/plugin-content-docs/client";

import styles from "./styles.module.css";

type Props = {
  onNavigate?: () => void;
};

function getMainDoc(version: GlobalVersion) {
  return version.docs.find(doc => doc.id === version.mainDocId)!;
}

export default function DocsVersionSwitch({ onNavigate }: Props) {
  const docsPluginId = "default";
  const { search, hash } = useLocation();
  const versions = useVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const { savePreferredVersionName } =
    useDocsPreferredVersion(docsPluginId);
  const orderedVersions = [...versions].sort((left, right) => {
    const order = { PW: 0, SW: 1 };
    return (order[left.label] ?? 2) - (order[right.label] ?? 2);
  });

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Documentation</span>
      <div
        className={styles.switcher}
        role="group"
        aria-label="Documentation version"
      >
        {orderedVersions.map(version => {
          const target =
            activeDocContext.alternateDocVersions[version.name] ??
            getMainDoc(version);
          const active =
            activeDocContext.activeVersion?.name === version.name;

          return (
            <Link
              key={version.name}
              className={`${styles.option} ${active ? styles.active : ""}`}
              to={`${target.path}${search}${hash}`}
              aria-current={active ? "page" : undefined}
              onClick={() => {
                savePreferredVersionName(version.name);
                onNavigate?.();
              }}
            >
              {version.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
