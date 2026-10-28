import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FeaturedArticles from '@site/src/components/FeaturedArticles';
import ArticleIndex from '@site/src/components/ArticleIndex';

import styles from './index.module.css';

function HomepageHeader(): ReactNode {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <p className={styles.eyebrow}>Content Pipeline Docs</p>
        <Heading as="h1" className={styles.heroTitle}>
          Practical technology research.{' '}
          <span>Clearer decisions.</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          Evidence-based articles exploring how software systems work, how
          technology choices compare, and what their trade-offs mean in
          practice.
        </p>
        <div className={styles.buttons}>
          <a
            className="button button--primary button--lg"
            href="#articles-index">
            Explore Articles
          </a>
          <Link
            className={styles.secondaryButton}
            to="/docs/intro">
            Publication Overview <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.secondaryButton} to="/docs/category/developer-oriented-articles">
            Developer Track <span aria-hidden="true">→</span>
          </Link>
          <Link className={styles.secondaryButton} to="/docs/category/owner-oriented-articles">
            Owner Track <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Practical technology research. Clearer decisions."
      description="Evidence-based articles exploring how software systems work, how technology choices compare, and what their trade-offs mean in practice.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <FeaturedArticles />
        <ArticleIndex />
      </main>
    </Layout>
  );
}
