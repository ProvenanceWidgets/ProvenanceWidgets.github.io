import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'web-provenance-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'web-provenance-dropdown': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'web-provenance-multiselect': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'web-provenance-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'web-provenance-radiobutton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'web-provenance-inputtext': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = () => {
    const citation = `@article{narechania2024provenancewidgets,
      title = {{ProvenanceWidgets}: {A Library of UI Control Elements to Track and Dynamically Overlay Analytic Provenance}},
      shorttitle = {{ProvenanceWidgets}},
      author = {{Narechania}, Arpit and {Odak}, Kaustubh and {El-Assady}, Mennatallah and {Endert}, Alex},
      journal = {IEEE Transactions on Visualization and Computer Graphics (TVCG)},
      doi = {10.48550/arXiv.2407.17431},
      url = {https://doi.org/10.48550/arXiv.2407.17431},
      year = {2024},
      publisher = {IEEE}
    }`
    navigator.clipboard.writeText(citation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title hidden sm:block">
          {siteConfig.title}
        </Heading>
        <Heading as="h1" className="text-5xl block sm:hidden">
          Provenance Widgets
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className='blog-authors-list-page'>
          {(siteConfig.customFields["authors"] as string[]).join(", ")}
          <br />
          {(siteConfig.customFields["institutes"] as string[]).join(" and ")}
        </p>
        <div className="flex flex-column justify-content-center align-items-center gap-2 md:flex-row">
          <Link
            className="button button--secondary button--lg"
            to="/docs"
          >
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{ color: 'var(--ifm-background-surface-color)' }}
            to="https://arxiv.org/pdf/2407.17431">
            Read the Paper (VIS 2024)
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{ color: 'var(--ifm-background-surface-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={copyToClipboard}
          >
            Cite (bibtex)
            {
              isCopied ?
              <svg 
                viewBox="0 0 24 24" 
                className="copyButtonSuccessIcon_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-CopyButton-styles-module"
                style={{ position: 'relative', width: '1.125rem', height: '1.125rem', transform: 'none', left: 0, top: 0, opacity: 1 }}
              >
                <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
              </svg>
              :
              <svg
                viewBox="0 0 24 24"
                className="copyButtonIcon_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-CopyButton-styles-module"
                style={{ position: 'relative', width: '1.125rem', height: '1.125rem' }}
              >
                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
              </svg>
            }
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main className='flex justify-content-center container py-4'>
        <iframe width="750" height="450" src="https://www.youtube.com/embed/7l6jKbS2SFI?si=PDoRfnujOQZZ_8gn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </main>
    </Layout>
  );
}
