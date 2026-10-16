import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <p className={styles.eyebrow}>A practical guide to reliable content systems</p>
        <Heading as="h1" className={styles.heroTitle}>
          Build a content pipeline that
          <span> scales with your ideas.</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          {siteConfig.title} brings the workflows, patterns, and technical
          decisions behind modern content operations into one clear workspace.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Explore the docs
          </Link>
          <Link className={styles.secondaryButton} to="/blog">
            Read the latest notes <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <div className={styles.pipelinePreview} aria-label="Content pipeline overview">
          <div className={styles.previewHeader}>
            <span className={styles.statusDot} />
            <span>content-pipeline / current</span>
            <code>v1.0</code>
          </div>
          <div className={styles.previewSteps}>
            {['Outline', 'Research', 'Write', 'Review'].map((step, index) => (
              <div className={styles.previewStep} key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
                {index < 3 && <i aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation for designing and operating a modern content pipeline.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
