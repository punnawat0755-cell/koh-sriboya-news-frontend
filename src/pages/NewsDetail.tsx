import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsDetail, type News } from "../services/newsService";
import { dateLabel } from "../lib/format";
export default function NewsDetail() {
  const { slug = "" } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    getNewsDetail(slug, controller.signal)
      .then((result) => {
        setNews(result.data);
        setSource(result.source);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      });
    window.scrollTo(0, 0);
    return () => controller.abort();
  }, [slug]);
  useEffect(() => {
    if (news) document.title = `${news.title} | ข่าวเกาะศรีบอยา`;
    return () => {
      document.title = "ข่าวเกาะศรีบอยา | ข่าวชุมชน";
    };
  }, [news]);
  return (
    <main className="container detail" id="main-content">
      <Link className="back-link" to="/">
        ← กลับสู่ข่าวทั้งหมด
      </Link>
      {error ? (
        <div className="state" role="alert">
          {error}
        </div>
      ) : !news ? (
        <div className="state" role="status">
          กำลังโหลดข่าว…
        </div>
      ) : (
        <article>
          <div className="detail-heading">
            <span className="tag">{news.category}</span>
            <h1>{news.title}</h1>
            <p className="detail-excerpt">{news.excerpt}</p>
            <p className="byline">
              {news.author} · {dateLabel(news.publishedAt)}
            </p>
          </div>
          <img className="detail-image" src={news.image} alt={news.imageAlt} />
          {source === "sample" && (
            <p className="image-caption">
              ภาพประกอบจาก Unsplash · เนื้อหาตัวอย่างสำหรับสาธิตระบบ
              ไม่ใช่รายงานเหตุการณ์จริง
            </p>
          )}
          <div className="article-content">
            {news.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <Link
              className="back-link"
              to={`/?category=${encodeURIComponent(news.category)}`}
            >
              อ่านข่าวในหมวด{news.category}ต่อ →
            </Link>
          </div>
        </article>
      )}
    </main>
  );
}
