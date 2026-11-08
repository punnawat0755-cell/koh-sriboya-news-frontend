import { Link } from "react-router-dom";
import type { News } from "../../services/newsService";

export function AdminMedia({ news }: { news: News[] }) {
  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <div>
          <h2>ภาพประกอบข่าว</h2>
          <p>ภาพจากข่าวที่เผยแพร่ · คลิกเพื่อเปิดบทความ</p>
        </div>
        <span>{news.filter((item) => item.image).length} ภาพ</span>
      </div>
      <div className="media-grid">
        {news
          .filter((item) => item.image)
          .map((item) => (
            <Link key={item.slug} to={`/news/${item.slug}`}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" />
              <span>{item.title}</span>
            </Link>
          ))}
      </div>
    </section>
  );
}
