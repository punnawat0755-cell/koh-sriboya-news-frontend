import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import type { News } from "../../services/newsService";
import { NewsCard } from "../NewsCard";
import { dateLabel } from "../../lib/format";

export function FeaturedNews({ news }: { news: News[] }) {
  const lead = news.find((item) => item.featured) || news[0];
  const sides = news.filter((item) => item.slug !== lead?.slug).slice(0, 2);
  if (!lead) return null;
  return (
    <section className="hero-grid" aria-label="ข่าวเด่น">
      <Link to={`/news/${lead.slug}`} className="hero-lead">
        <img src={lead.image} alt={lead.imageAlt} />
        <div className="hero-gradient" />
        <div className="hero-copy">
          <span className="label-blue">เรื่องเด่นวันนี้</span>
          <h1>{lead.title}</h1>
          <p>{lead.excerpt}</p>
          <div>
            {dateLabel(lead.publishedAt)}
            <span>
              อ่านต่อ <Icon name="arrow" size={15} />
            </span>
          </div>
        </div>
      </Link>
      <div className="hero-side">
        {sides.map((item) => (
          <NewsCard key={item.slug} news={item} />
        ))}
      </div>
    </section>
  );
}
