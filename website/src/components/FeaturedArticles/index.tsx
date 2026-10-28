import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {articles, Article} from '@site/src/data/articles';
import styles from './styles.module.css';

export default function FeaturedArticles(): ReactNode {
  const featured = articles.filter((a) => a.featured).slice(0, 4);

  return (
    <section className={styles.section} aria-labelledby="featured-articles-title">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Curated Research</span>
          <Heading as="h2" id="featured-articles-title" className={styles.title}>
            Featured Technical Articles
          </Heading>
          <p className={styles.subtitle}>
            Highlighted implementations and strategic frameworks selected for their depth, reproducible methods, and clear trade-off analysis.
          </p>
        </div>

        <div className={styles.grid}>
          {featured.map((article: Article) => {
            const isDev = article.track === 'Developer Research';
            return (
              <Link
                key={article.id}
                to={article.slug}
                className={styles.card}
                aria-label={`Read article: ${article.title}`}>
                <div>
                  <div className={styles.cardMeta}>
                    <span
                      className={`${styles.trackBadge} ${
                        isDev ? styles.trackDev : styles.trackOwner
                      }`}>
                      {article.track}
                    </span>
                    <span className={styles.categoryTag}>{article.category}</span>
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>

                  <Heading as="h3" className={styles.cardTitle}>
                    {article.title}
                  </Heading>

                  <p className={styles.cardDesc}>{article.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span>Read Article</span>
                  <span className={styles.arrow} aria-hidden="true">
                    -&gt;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
