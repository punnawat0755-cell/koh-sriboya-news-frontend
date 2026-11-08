import type { News } from "../../services/newsService";
import { SectionHeading } from "./SectionHeading";
import { NewsGrid } from "./NewsGrid";

export function TravelNews({ travel }: { travel: News[] }) {
  return (
    <section className="travel-band">
      <div className="container">
        <SectionHeading
          title="เที่ยวบ้านเรา · ใช้ชีวิตริมเล"
          to="/?category=ท่องเที่ยว"
        />
        <div className="travel-intro">
          <p>มองเกาะในมุมที่ต่างไป ผ่านธรรมชาติ อาหาร และวิถีชีวิตของผู้คน</p>
          <span>TRAVEL & LIFE</span>
        </div>
        <NewsGrid news={travel} className="three-columns" />
        {!travel.length && (
          <p className="empty-inline">เรื่องราวการท่องเที่ยวจะปรากฏที่นี่</p>
        )}
      </div>
    </section>
  );
}
