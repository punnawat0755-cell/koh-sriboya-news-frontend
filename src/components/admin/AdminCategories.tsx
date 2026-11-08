import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import type { News } from "../../services/newsService";
import { categories } from "../../lib/format";

export function AdminCategories({ news }: { news: News[] }) {
  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <h2>หมวดหมู่ข่าว</h2>
        <span>{categories.length} หมวดหมู่</span>
      </div>
      <div className="category-grid">
        {categories.map((name) => (
          <Link to={`/?category=${encodeURIComponent(name)}`} key={name}>
            <Icon name="folder" />
            <h3>{name}</h3>
            <p>
              {news.filter((item) => item.category === name).length} ข่าวเผยแพร่
            </p>
            <span>เปิดดูหมวดหมู่ →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
