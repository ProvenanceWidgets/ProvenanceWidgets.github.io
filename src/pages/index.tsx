import Link from "@docusaurus/Link";
import { Redirect } from "@docusaurus/router";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import React from "react";
import styles from "./index.module.css";

type PaperLink = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

type Paper = {
  venue: string;
  title: string;
  subtitle: string;
  authors: string;
  image: string;
  imageAlt: string;
  summary: string;
  links: PaperLink[];
  bibtex: string;
};

const papers: Paper[] = [
  {
    venue: "IEEE TVCG 2024",
    title: "ProvenanceWidgets",
    subtitle:
      "A Library of UI Control Elements to Track and Dynamically Overlay Analytic Provenance",
    authors:
      "Arpit Narechania, Kaustubh Odak, Mennatallah El-Assady, and Alex Endert",
    image: "/img/papers/provenance-widgets-2024-overview.png",
    imageAlt:
      "Overview of the ProvenanceWidgets interface and model-view-controller architecture",
    summary:
      "ProvenanceWidgets augments familiar controls - including sliders, dropdowns, checkboxes, radio buttons, and text inputs - with in-situ aggregate and temporal views of interaction history. Developers can use the library to help people recall, revisit, and reason about their analytic process without leaving the control panel.",
    links: [
      {
        label: "PDF",
        href: "https://narechania.com/docs/publications/provenance_widgets_2024.pdf",
        kind: "primary",
      },
      {
        label: "DOI",
        href: "https://doi.org/10.1109/TVCG.2024.3456144",
      },
      {
        label: "Video",
        href: "https://www.youtube.com/watch?v=7l6jKbS2SFI",
      },
      {
        label: "Supplemental material",
        href: "https://github.com/ProvenanceWidgets/Supplemental-Material",
      },
    ],
    bibtex: `@article{narechania2024provenancewidgets,
  title = {{ProvenanceWidgets}: {A Library of UI Control Elements to Track and Dynamically Overlay Analytic Provenance}},
  shorttitle = {{ProvenanceWidgets}},
  author = {{Narechania}, Arpit and {Odak}, Kaustubh and {El-Assady}, Mennatallah and {Endert}, Alex},
  journal = {IEEE Transactions on Visualization and Computer Graphics (TVCG)},
  doi = {10.1109/TVCG.2024.3456144},
  url = {https://doi.org/10.1109/TVCG.2024.3456144},
  year = {2024},
  publisher = {IEEE}
}`,
  },
  {
    venue: "ACM CHI LBW 2026",
    title: "SuperProvenanceWidgets",
    subtitle:
      "Tracking and Visualizing Analytic Provenance Across UI Control Elements",
    authors: "Antariksh Verma, Kaustubh Odak, and Arpit Narechania",
    image: "/img/papers/superprovenance-widgets-2026-overview.png",
    imageAlt:
      "Overview of SuperProvenanceWidgets showing aggregate and temporal provenance within and across controls",
    summary:
      "SuperProvenanceWidgets extends the library from individual controls to the interface as a whole. Its SuperWidget summarizes which controls were used, how often, when, and in what sequence - supporting workflow auditing and sharing, reflection on exploration bias, and interface personalization.",
    links: [
      {
        label: "PDF",
        href: "https://narechania.com/docs/publications/superprovenancewidgets_chi_2026.pdf",
        kind: "primary",
      },
      {
        label: "DOI",
        href: "https://doi.org/10.1145/3772363.3798409",
      },
      {
        label: "Video",
        href: "https://www.youtube.com/watch?v=7EFYw_0JrZM",
      },
    ],
    bibtex: `@article{verma2026superprovenancewidgets,
  author = {Verma, Antariksh and Odak, Kaustubh and Narechania, Arpit},
  title = {{SuperProvenanceWidgets: Tracking and Visualizing Analytic Provenance Across UI Control Elements}},
  url = {https://doi.org/10.1145/3772363.3798409},
  journal = {ACM CHI LBW},
  year = {2026},
  publisher = {ACM}
}`,
  },
];

function CopyCitationButton({ citation }: { citation: string }) {
  const [copied, setCopied] = React.useState(false);

  const copyCitation = async () => {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      className={styles.copyButton}
      type="button"
      onClick={copyCitation}
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy BibTeX"}
    </button>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroContent}>
        <Heading as="h1" className={styles.heroTitle}>
          Provenance<span>Widgets</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          A JavaScript library of familiar UI controls that capture and
          visualize interaction history - within individual controls and across
          an entire interface.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/docs/sw/">
            Get started
          </Link>
          <Link
            className={styles.secondaryAction}
            href="https://github.com/ProvenanceWidgets/ProvenanceWidgets"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className={styles.paperCard}>
      <div className={styles.paperCardHeader}>
        <div className={styles.paperMeta}>
          <span>{paper.venue}</span>
        </div>
        <Heading as="h3" className={styles.paperTitle}>
          {paper.title}
        </Heading>
        <p className={styles.paperSubtitle}>{paper.subtitle}</p>
        <p className={styles.authors}>{paper.authors}</p>
      </div>

      <a
        className={styles.paperPreview}
        href={paper.links[0].href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${paper.title} paper`}
      >
        <img src={paper.image} alt={paper.imageAlt} />
      </a>

      <div className={styles.paperBody}>
        <div className={styles.paperLinks}>
          {paper.links.map((link) => (
            <a
              key={link.label}
              className={
                link.kind === "primary"
                  ? styles.paperLinkPrimary
                  : styles.paperLink
              }
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className={styles.summary}>{paper.summary}</p>

        <div className={styles.citationHeader}>
          <span>Citation</span>
          <CopyCitationButton citation={paper.bibtex} />
        </div>
        <pre className={styles.citation} tabIndex={0}>
          <code>{paper.bibtex}</code>
        </pre>
      </div>
    </article>
  );
}

export function SuperProvenanceWidgetsHome(): JSX.Element {
  return (
    <Layout
      title="ProvenanceWidgets"
      description="Track and visualize analytic provenance within and across user interface controls."
    >
      <HomepageHeader />
      <main className={styles.main}>
        <section className={styles.publications}>
          <div className={styles.sectionHeading}>
            <Heading as="h2">Publications</Heading>
          </div>
          <div className={styles.paperGrid}>
            {papers.map((paper) => (
              <PaperCard key={paper.title} paper={paper} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default function HomeRedirect(): JSX.Element {
  return <Redirect to="/sw/" />;
}
