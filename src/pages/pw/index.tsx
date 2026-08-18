import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import React from "react";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const citation = `@article{narechania2024provenancewidgets,
  title = {{ProvenanceWidgets}: {A Library of UI Control Elements to Track and Dynamically Overlay Analytic Provenance}},
  shorttitle = {{ProvenanceWidgets}},
  author = {{Narechania}, Arpit and {Odak}, Kaustubh and {El-Assady}, Mennatallah and {Endert}, Alex},
  journal = {IEEE Transactions on Visualization and Computer Graphics (TVCG)},
  doi = {10.1109/TVCG.2024.3456144},
  url = {https://doi.org/10.1109/TVCG.2024.3456144},
  year = {2024},
  publisher = {IEEE}
}`;

    void navigator.clipboard.writeText(citation);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading
          as="h1"
          className={clsx("hero__title hidden sm:block", styles.heroTitle)}
        >
          {siteConfig.title}
        </Heading>
        <Heading
          as="h1"
          className={clsx("block sm:hidden", styles.heroTitle)}
        >
          Provenance Widgets
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="blog-authors-list-page">
          {(siteConfig.customFields.authors as string[]).join(", ")}
          <br />
          {(siteConfig.customFields.institutes as string[]).join(" and ")}
        </p>
        <div className="flex flex-column justify-content-center align-items-center gap-2 md:flex-row">
          <Link className="button button--secondary button--lg" to="/docs/pw/">
            Get Started
          </Link>
          <div className="dropdown dropdown--hoverable">
            <button
              className="button button--outline button--secondary button--lg"
              style={{ color: "var(--ifm-background-surface-color)" }}
              type="button"
            >
              📃 Paper
            </button>
            <ul className="dropdown__menu">
              <li>
                <a
                  className="dropdown__link text--left"
                  href="https://doi.org/10.1109/TVCG.2024.3456144"
                  target="_blank"
                  rel="noreferrer"
                >
                  2024 TVCG paper
                </a>
              </li>
              <li>
                <a
                  className="dropdown__link text--left"
                  href="https://arxiv.org/pdf/2407.17431"
                  target="_blank"
                  rel="noreferrer"
                >
                  arXiv Preprint
                </a>
              </li>
              <li>
                <a
                  className="dropdown__link text--left"
                  href="#"
                  onClick={copyToClipboard}
                >
                  <span className={styles.citationLink}>
                    {isCopied ? "✓" : "▣"} Cite (bibtex)
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ProvenanceWidgetsHome(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={clsx("flex justify-content-center container py-4", styles.videoSection)}>
        <iframe
          className={styles.video}
          width="750"
          height="450"
          src="https://www.youtube.com/embed/7l6jKbS2SFI?si=PDoRfnujOQZZ_8gn"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </main>
    </Layout>
  );
}
