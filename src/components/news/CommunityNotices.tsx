import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import type { News } from "../../services/newsService";
import { dateLabel } from "../../lib/format";
import { SectionHeading } from "./SectionHeading";

export function CommunityNotices({ notices }: { notices: News[] }) {
  return (
    <section className="container notices-layout">
      <div>
        <SectionHeading title="ประชาสัมพันธ์" to="/?category=ประกาศ" />
        {notices.length ? (
          notices.map((item) => (
            <Link
              key={item.slug}
              to={`/news/${item.slug}`}
              className="notice-row"
            >
              <span>ประกาศชุมชน</span>
              <div>
                <h3>{item.title}</h3>
                <time>{dateLabel(item.publishedAt)}</time>
              </div>
              <Icon name="arrow" size={16} />
            </Link>
          ))
        ) : (
          <p className="empty-inline">ยังไม่มีประกาศใหม่</p>
        )}
      </div>
      <aside className="report-card">
        <Icon name="mail" size={23} />
        <span>พื้นที่รับฟังเสียงของชุมชน</span>
        <h2>มีเรื่องดี ๆ ในชุมชน เล่าให้เราฟังได้</h2>
        <p>เรื่องราว กิจกรรม หรือข้อเสนอแนะของคุณ มีความหมายกับบ้านเรา</p>
        <Link to="/about#contact">
          ติดต่อกองบรรณาธิการ <Icon name="arrow" size={15} />
        </Link>
      </aside>
    </section>
  );
}
