import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  number: string;
  label: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    number: '01',
    label: 'Foundations',
    title: 'A clear path from idea to publish',
    description: (
      <>
        Understand the stages, roles, and handoffs that make a content
        operation predictable.
      </>
    ),
  },
  {
    number: '02',
    label: 'Patterns',
    title: 'Practical patterns, not abstract theory',
    description: (
      <>
        Reusable guidance for prompts, research, review, and the systems that
        connect them.
      </>
    ),
  },
  {
    number: '03',
    label: 'Reference',
    title: 'A living reference for your team',
    description: (
      <>
        Keep decisions discoverable with technical documentation that is easy
        to scan, compare, and apply.
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
      <span className={styles.featureArrow} aria-hidden="true">
        -&gt;
      </span>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className="eyebrow">What you will find here</p>
          <Heading as="h2">Less noise. Better systems.</Heading>
          <p>
            Everything is organized to help you move from a blank page to a
            repeatable publishing workflow.
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
