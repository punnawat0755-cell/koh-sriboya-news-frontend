import type { News } from "../../services/newsService";
import { NewsCard } from "../NewsCard";

export function NewsGrid({
  news,
  className = "news-grid",
  compact = false,
}: {
  news: News[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={className}>
      {news.map((item) => (
        <NewsCard key={item.slug} news={item} compact={compact} />
      ))}
    </div>
  );
}
