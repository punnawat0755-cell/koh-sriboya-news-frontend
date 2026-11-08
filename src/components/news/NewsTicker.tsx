import { Link } from "react-router-dom";
import type { News } from "../../services/newsService";

export function NewsTicker({ latest }: { latest?: News }) {
  return (
    <div className="ticker">
      <div className="container">
        <span>
          <i /> ข่าวล่าสุด
        </span>
        <Link to={latest ? `/news/${latest.slug}` : "/"}>
          {latest?.title || "ติดตามเรื่องราว ข่าวสาร และกิจกรรมของชุมชน"}
        </Link>
        <span className="ticker-location">เกาะศรีบอยา · กระบี่</span>
      </div>
    </div>
  );
}
