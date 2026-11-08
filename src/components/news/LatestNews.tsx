import { Link } from "react-router-dom";
import type { News } from "../../services/newsService";
import { dateLabel } from "../../lib/format";
import { SectionHeading } from "./SectionHeading";

export function LatestNews({ news }: { news: News[] }) {
  return (
    <aside className="latest-sidebar">
      <SectionHeading title="ข่าวล่าสุด" to="/?view=latest" />
      <ol>
        {news.slice(0, 5).map((item, i) => (
          <li key={item.slug}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <small>{item.category}</small>
              <Link to={`/news/${item.slug}`}>{item.title}</Link>
              <time>{dateLabel(item.publishedAt)}</time>
            </div>
          </li>
        ))}
      </ol>
      <p>ทุกเรื่องราวของชุมชน เริ่มต้นจากคนใกล้ตัว</p>
    </aside>
  );
}
