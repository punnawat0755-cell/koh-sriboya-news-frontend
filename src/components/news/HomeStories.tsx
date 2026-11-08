import { Link } from "react-router-dom";
import type { News } from "../../services/newsService";
import { NewsGrid } from "./NewsGrid";
import { SectionHeading } from "./SectionHeading";
import { FeaturedNews } from "./FeaturedNews";
import { LatestNews } from "./LatestNews";

export function HomeStories({ news }: { news: News[] }) {
  const community = news
    .filter(
      (item) =>
        ["ข่าวชุมชน", "อาชีพและเศรษฐกิจ", "กิจกรรม"].includes(item.category) &&
        !item.featured,
    )
    .slice(0, 2);
  const history = news
    .filter((item) => ["ประวัติศาสตร์", "สิ่งแวดล้อม"].includes(item.category))
    .slice(0, 2);
  return (
    <>
      <FeaturedNews news={news} />
      <div className="popular-tags">
        <strong>ประเด็นที่น่าสนใจ</strong>
        {["ข่าวชุมชน", "ท่องเที่ยว", "ประวัติศาสตร์", "สิ่งแวดล้อม"].map(
          (tag) => (
            <Link key={tag} to={`/?category=${encodeURIComponent(tag)}`}>
              #{tag}
            </Link>
          ),
        )}
      </div>
      <div className="community-layout">
        <div>
          <section>
            <SectionHeading title="ข่าวชุมชน" to="/?category=ข่าวชุมชน" />
            <NewsGrid news={community} className="two-columns" />
            {!community.length && (
              <p className="empty-inline">ยังไม่มีข่าวในหมวดนี้</p>
            )}
          </section>
          <section className="history-section">
            <SectionHeading
              title="เรื่องเล่าเกาะศรีบอยา"
              to="/?category=ประวัติศาสตร์"
            />
            <NewsGrid news={history} className="two-columns" compact />
            {!history.length && (
              <p className="empty-inline">รอติดตามเรื่องเล่าจากชุมชน</p>
            )}
          </section>
        </div>
        <LatestNews news={news} />
      </div>
    </>
  );
}
