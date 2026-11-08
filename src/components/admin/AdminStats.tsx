import { Icon } from "../Icon";

export function AdminStats({
  newsCount,
  draftCount,
  categoryCount,
}: {
  newsCount: number;
  draftCount: number;
  categoryCount: number;
}) {
  return (
    <div className="stat-grid">
      {[
        [
          "ข่าวที่แสดงบนเว็บไซต์",
          String(newsCount),
          "news",
          "จากข้อมูล API ปัจจุบัน",
        ],
        [
          "ฉบับร่างบนเครื่อง",
          String(draftCount),
          "edit",
          "บันทึกเฉพาะเบราว์เซอร์นี้",
        ],
        [
          "หมวดหมู่ที่มีข่าว",
          String(categoryCount),
          "folder",
          "จากข่าวที่เผยแพร่แล้ว",
        ],
        ["ยอดเข้าชมเว็บไซต์", "—", "eye", "ยังไม่เปิดระบบเก็บสถิติ"],
      ].map(([label, value, icon, note]) => (
        <article className="stat-card" key={label}>
          <div>
            <span>{label}</span>
            <Icon name={icon} size={19} />
          </div>
          <strong>{value}</strong>
          <small>{note}</small>
        </article>
      ))}
    </div>
  );
}
