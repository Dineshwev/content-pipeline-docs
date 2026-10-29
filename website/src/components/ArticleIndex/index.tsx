import {useState, useMemo, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {articles, type Article} from '@site/src/data/articles';
import styles from './styles.module.css';

type CategoryFilter = 'All' | 'Developer Research' | 'Case Studies' | 'Technology Comparisons' | 'Business Decisions';
type TrackFilter = 'All' | 'Developer Research' | 'Owner Decisions';

const CATEGORY_TABS: {key: CategoryFilter; label: string}[] = [
  {key: 'All', label: 'All Categories'},
  {key: 'Developer Research', label: 'Developer Research'},
  {key: 'Case Studies', label: 'Case Studies'},
  {key: 'Technology Comparisons', label: 'Technology Comparisons'},
  {key: 'Business Decisions', label: 'Business Decisions'},
];

const TRACK_OPTIONS: {key: TrackFilter; label: string}[] = [
  {key: 'All', label: 'All Tracks'},
  {key: 'Developer Research', label: 'Developer Track'},
  {key: 'Owner Decisions', label: 'Owner Track'},
];

function ArticleCard({article}: {article: Article}): ReactNode {
  const isDev = article.track === 'Developer Research';
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.tagGroup}>
          <span
            className={`${styles.trackBadge} ${isDev ? styles.trackDev : styles.trackOwner}`}
            aria-label={`Track: ${article.track}`}>
            {isDev ? 'Developer' : 'Owner'}
          </span>
          <span className={styles.categoryBadge}>{article.category}</span>
        </div>
        <span className={styles.readTime} aria-label={`Estimated reading time: ${article.readTime}`}>
          {article.readTime}
        </span>
      </div>

      <Heading as="h3" className={styles.cardTitle}>
        <Link to={article.slug} className={styles.titleLink}>
          {article.title}
        </Link>
      </Heading>

      <p className={styles.cardDescription}>{article.description}</p>

      <div className={styles.cardFooter}>
        {article.companionSlug && article.companionTitle ? (
          <div className={styles.companionHint}>
            <span className={styles.companionLabel}>Paired with:</span>
            <Link to={article.companionSlug} className={styles.companionLink} title={article.companionTitle}>
              {isDev ? 'Owner Guide' : 'Developer Method'} ↗
            </Link>
          </div>
        ) : (
          <span />
        )}

        <Link to={article.slug} className={styles.readLink} aria-label={`Read full article: ${article.title}`}>
          <span>Read Article</span>
          <span aria-hidden="true" className={styles.readArrow}>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function ArticleIndex(): ReactNode {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [activeTrack, setActiveTrack] = useState<TrackFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryCounts = useMemo(() => {
    return {
      All: articles.length,
      'Developer Research': articles.filter((a) => a.track === 'Developer Research').length,
      'Case Studies': articles.filter((a) => a.category === 'Case Studies').length,
      'Technology Comparisons': articles.filter((a) => a.category === 'Technology Comparisons').length,
      'Business Decisions': articles.filter((a) => a.category === 'Business Decisions').length,
    };
  }, []);

  const handleCategoryChange = (tabKey: CategoryFilter) => {
    setActiveCategory(tabKey);
    if (tabKey === 'Developer Research' && activeTrack === 'Owner Decisions') {
      setActiveTrack('All');
    }
  };

  const handleTrackChange = (trackKey: TrackFilter) => {
    setActiveTrack(trackKey);
    if (trackKey === 'Owner Decisions' && activeCategory === 'Developer Research') {
      setActiveCategory('All');
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filtering
      if (activeCategory === 'Developer Research' && article.track !== 'Developer Research') {
        return false;
      }
      if (
        activeCategory !== 'All' &&
        activeCategory !== 'Developer Research' &&
        article.category !== activeCategory
      ) {
        return false;
      }

      // Track filtering
      if (activeTrack !== 'All' && article.track !== activeTrack) {
        return false;
      }

      // Search query filtering
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesDesc = article.description.toLowerCase().includes(query);
        const matchesCat = article.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeTrack, searchQuery]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveTrack('All');
    setSearchQuery('');
  };

  return (
    <section className={styles.section} id="articles-index" aria-labelledby="article-index-title">
      <div className="container">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>Article Discovery</span>
          <Heading as="h2" id="article-index-title" className={styles.title}>
            Explore the Technical Publication
          </Heading>
          <p className={styles.subtitle}>
            Browse our complete library of evidence-based articles. Every topic provides two complementary
            perspectives: engineering implementations with code and benchmarks, paired with executive decision frameworks.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className={styles.toolbar} role="search" aria-label="Filter and search articles">
          {/* Category Tabs */}
          <div className={styles.categoryTabs} role="tablist" aria-label="Article categories">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
                  onClick={() => handleCategoryChange(tab.key)}>
                  {tab.label}
                  <span className={styles.tabCount}>{categoryCounts[tab.key]}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.filterRow}>
            {/* Track Switcher */}
            <div className={styles.trackGroup} role="group" aria-label="Filter by editorial track">
              <span className={styles.filterLabel}>Track:</span>
              {TRACK_OPTIONS.map((track) => {
                const isActive = activeTrack === track.key;
                return (
                  <button
                    key={track.key}
                    type="button"
                    className={`${styles.trackButton} ${isActive ? styles.trackButtonActive : ''}`}
                    onClick={() => handleTrackChange(track.key)}>
                    {track.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className={styles.searchBox}>
              <label htmlFor="article-search-input" className="sr-only">
                Search articles
              </label>
              <input
                id="article-search-input"
                type="search"
                className={styles.searchInput}
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.searchClear}
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query">
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredArticles.length}</strong> of <strong>{articles.length}</strong> articles
            </span>
            {(activeCategory !== 'All' || activeTrack !== 'All' || searchQuery) && (
              <button type="button" className={styles.resetLink} onClick={resetFilters}>
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid or Empty State */}
        {filteredArticles.length > 0 ? (
          <div className={styles.grid}>
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState} role="status">
            <Heading as="h3" className={styles.emptyTitle}>
              No articles matched your criteria
            </Heading>
            <p className={styles.emptyDesc}>
              No articles were found matching your current filter combination or search query.
            </p>
            <button type="button" className="button button--primary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
