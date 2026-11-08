import type { News } from "../../services/newsService";
import { NewsGrid } from "./NewsGrid";

export function NewsResults({ news }: { news: News[] }) {
  return (
    <section className="results-section">
      <div className="results-count">พบ {news.length} ข่าว</div>
      {news.length ? (
        <NewsGrid news={news} />
      ) : (
        <div className="state">
          <h2>ไม่พบข่าวที่ตรงกับการค้นหา</h2>
          <p>ลองเปลี่ยนคำค้น หมวดหมู่ หรือวันที่เผยแพร่</p>
        </div>
      )}
    </section>
  );
}
