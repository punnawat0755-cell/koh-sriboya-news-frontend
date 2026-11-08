import { Link } from "react-router-dom";
import type { News } from "../services/newsService";
import { dateLabel } from "../lib/format";

export function NewsCard({
  news,
  compact = false,
}: {
  news: News;
  compact?: boolean;
}) {
  return (
    <article className={`news-card ${compact ? "compact-card" : ""}`}>
      <Link
        className="card-image"
        to={`/news/${news.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={news.image} alt="" loading="lazy" />
      </Link>
      <div className="card-body">
        <Link
          className="card-category"
          to={`/?category=${encodeURIComponent(news.category)}`}
        >
          {news.category}
        </Link>
        <h3>
          <Link to={`/news/${news.slug}`}>{news.title}</Link>
        </h3>
        {!compact && <p>{news.excerpt}</p>}
        <time dateTime={news.publishedAt}>{dateLabel(news.publishedAt)}</time>
      </div>
    </article>
  );
}
