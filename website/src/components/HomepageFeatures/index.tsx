import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  number: string;
  label: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    number: '01',
    label: 'Developer Track',
    title: 'Implementation evidence, not abstract theory',
    description: (
      <>
        Architecture decisions, TypeScript workflows, database schemas, API
        integrations, and reproducible benchmarks — with honest limitations and
        failure cases documented alongside results.
      </>
    ),
  },
  {
    number: '02',
    label: 'Owner Track',
    title: 'Decision frameworks, not sales pitches',
    description: (
      <>
        Clear option comparisons, total cost analysis, vendor risk assessments,
        and actionable recommendations — built for business owners who need
        strategic clarity, not technical jargon.
      </>
    ),
  },
  {
    number: '03',
    label: 'Companion Links',
    title: 'Two perspectives on every question',
    description: (
      <>
        Each topic is published as a matched pair: an engineering deep-dive and a
        strategic decision guide. Cross-linked so you can switch perspectives
        with one click.
      </>
    ),
  },
];

function Feature({number, label, title, description}: FeatureItem) {
  return (
    <article className={styles.featureCard}>
      <div className={styles.featureMeta}>
        <span>{number}</span>
        <span>{label}</span>
      </div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} aria-labelledby="what-you-find-title">
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What you will find here</p>
          <Heading as="h2" id="what-you-find-title">
            Research that respects your time
          </Heading>
          <p>
            Every article follows a consistent structure: problem, evidence,
            trade-offs, and a clear recommendation you can act on.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((props) => (
            <Feature key={props.number} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
