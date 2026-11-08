import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { menu } from "./adminMenu";
import { logo } from "../../lib/site";

export function AdminSidebar({
  section,
  mobileMenu,
  total,
  onSelect,
}: {
  section: string;
  mobileMenu: boolean;
  total: number;
  onSelect: (section: string) => void;
}) {
  return (
    <aside className={`admin-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
      <Link to="/" className="admin-brand">
        <img src={logo} alt="ข่าวเกาะศรีบอยา" />
        <strong>ข่าวเกาะศรีบอยา</strong>
        <span>ระบบจัดการข่าว · กองบรรณาธิการ</span>
      </Link>
      <div className="sidebar-label">จัดการเว็บไซต์</div>
      <nav aria-label="เมนูผู้ดูแล">
        {menu.map(([id, icon, label]) => (
          <button
            key={id}
            className={section === id ? "active" : ""}
            onClick={() => onSelect(id)}
          >
            <Icon name={icon} size={18} />
            {label}
            {id === "news" && <span className="sidebar-badge">{total}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-label">การสนับสนุน</div>
      <button
        className={`sidebar-help ${section === "help" ? "active" : ""}`}
        onClick={() => onSelect("help")}
      >
        <Icon name="help" size={18} />
        คู่มือการใช้งาน
      </button>
      <div className="sidebar-bottom">
        <span>ข่าวสาร เพื่อชุมชน</span>
        <Link to="/">
          <Icon name="home" size={17} />
          กลับหน้าเว็บไซต์
        </Link>
      </div>
    </aside>
  );
}
