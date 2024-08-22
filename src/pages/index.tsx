import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

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
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className='blog-authors-list-page'>
          {(siteConfig.customFields["authors"] as string[]).join(", ")}
          <br />
          {(siteConfig.customFields["institutes"] as string[]).join(" and ")}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            style={{ color: 'var(--ifm-background-surface-color)' }}
            to="https://arxiv.org/pdf/2407.17431">
            Read the Paper (VIS 2024)
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
