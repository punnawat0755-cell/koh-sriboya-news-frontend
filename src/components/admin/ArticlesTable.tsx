import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import type { News } from "../../services/newsService";
import { dateLabel } from "../../lib/format";
import type { Draft } from "../../lib/drafts";

export function ArticlesTable({
  news,
  drafts,
  query,
  status,
  onQueryChange,
  onStatusChange,
  onEdit,
  onViewAll,
}: {
  news: News[];
  drafts: Draft[];
  query: string;
  status: string;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: string) => void;
  onEdit: (draft: Partial<Draft>) => void;
  onViewAll?: () => void;
}) {
  const overview = Boolean(onViewAll);
  const rows = [
    ...drafts.map((draft) => ({
      id: draft.id,
      title: draft.title,
      category: draft.category,
      date: draft.updatedAt,
      image: "",
      draft,
      article: null as News | null,
    })),
    ...news.map((article) => ({
      id: article.slug,
      title: article.title,
      category: article.category,
      date: article.publishedAt,
      image: article.image,
      draft: null as Draft | null,
      article,
    })),
  ].filter(
    (row) =>
      (!query ||
        `${row.title} ${row.category}`
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (status === "all" || (status === "draft" ? row.draft : row.article)),
  );
  const editArticle = (article: News) =>
    onEdit({
      title: article.title,
      category: article.category,
      content: article.content,
    });
  return (
    <section className="admin-panel article-panel">
      <div className="panel-heading">
        <h2>{overview ? "ข่าวที่อัปเดตล่าสุด" : "ข่าวทั้งหมด"}</h2>
        {overview && (
          <button className="text-button" onClick={onViewAll}>
            ดูข่าวทั้งหมด →
          </button>
        )}
      </div>
      <div className="table-toolbar">
        <label>
          <Icon name="search" size={16} />
          <input
            aria-label="ค้นหาในรายการข่าว"
            placeholder="ค้นหาหัวข้อ / หมวดหมู่"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </label>
        <select
          aria-label="กรองสถานะข่าว"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">ทุกสถานะ</option>
          <option value="published">เผยแพร่แล้ว</option>
          <option value="draft">ฉบับร่างบนเครื่อง</option>
        </select>
      </div>
      <div className="table-scroll">
        <table className="articles-table">
          <thead>
            <tr>
              <th>หัวข้อข่าว / ผู้เขียน</th>
              <th>สถานะ</th>
              <th>วันที่อัปเดต</th>
              <th>เปิด / แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {(overview ? rows.slice(0, 4) : rows).map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="table-article">
                    {row.image ? (
                      <img src={row.image} alt="" />
                    ) : (
                      <span className="draft-thumb">
                        <Icon name="news" />
                      </span>
                    )}
                    <div>
                      {row.article ? (
                        <Link to={`/news/${row.id}`}>{row.title}</Link>
                      ) : (
                        <button
                          className="table-title-button"
                          onClick={() => onEdit(row.draft!)}
                        >
                          {row.title}
                        </button>
                      )}
                      <small>
                        {row.category} ·{" "}
                        {row.article?.author || "ฉบับร่างของคุณ"}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${row.draft ? "draft" : ""}`}>
                    {row.draft ? "● ฉบับร่างบนเครื่อง" : "● เผยแพร่แล้ว"}
                  </span>
                </td>
                <td>
                  <time>{dateLabel(row.date)}</time>
                </td>
                <td>
                  <button
                    aria-label={`แก้ไข ${row.title}`}
                    className="icon-button blue"
                    onClick={() =>
                      row.draft ? onEdit(row.draft) : editArticle(row.article!)
                    }
                  >
                    <Icon name="edit" size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <div className="state">ไม่พบข่าวที่ตรงกับตัวกรอง</div>}
      </div>
      <div className="table-footer">
        {overview ? Math.min(rows.length, 4) : rows.length} จาก {rows.length}{" "}
        รายการ · การแก้ไขจะบันทึกเป็นฉบับร่างบนเครื่อง
      </div>
    </section>
  );
}
