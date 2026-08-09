import React from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
  useActiveDocContext,
  useDocsPreferredVersion,
  useVersions,
  type GlobalVersion,
} from "@docusaurus/plugin-content-docs/client";

import styles from "./styles.module.css";

function getMainDoc(version: GlobalVersion) {
  return version.docs.find(doc => doc.id === version.mainDocId)!;
}

function getVersionLabel(version: GlobalVersion) {
  return version.name === "current" ? "2.0" : "1.0";
}

export default function DocsVersionSwitch(): JSX.Element {
  const docsPluginId = "default";
  const history = useHistory();
  const { search, hash } = useLocation();
  const versions = useVersions(docsPluginId);
  const activeDocContext = useActiveDocContext(docsPluginId);
  const { savePreferredVersionName } =
    useDocsPreferredVersion(docsPluginId);
  const orderedVersions = [...versions].sort((left, right) => {
    const order = { current: 0, "1.0": 1 };
    return (order[left.name] ?? 2) - (order[right.name] ?? 2);
  });
  const activeVersionName =
    activeDocContext.activeVersion?.name ?? orderedVersions[0]?.name;

  return (
    <span className={styles.picker}>
      <select
        className={styles.select}
        value={activeVersionName}
        aria-label="Documentation version"
        onChange={event => {
          const selectedVersion = versions.find(
            version => version.name === event.currentTarget.value,
          );

          if (!selectedVersion) {
            return;
          }

          const target =
            activeDocContext.alternateDocVersions[selectedVersion.name] ??
            getMainDoc(selectedVersion);

          savePreferredVersionName(selectedVersion.name);
          history.push(`${target.path}${search}${hash}`);
        }}
      >
        {orderedVersions.map(version => {
          return (
            <option
              key={version.name}
              value={version.name}
            >
              {getVersionLabel(version)}
            </option>
          );
        })}
      </select>
    </span>
  );
}
