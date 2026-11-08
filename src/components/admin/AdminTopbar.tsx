import { Icon } from "../Icon";

export function AdminTopbar({
  label,
  mobileMenu,
  onToggleMenu,
  onShowStatus,
}: {
  label: string;
  mobileMenu: boolean;
  onToggleMenu: () => void;
  onShowStatus: () => void;
}) {
  return (
    <header className="admin-topbar">
      <div>
        <button
          className="icon-button mobile-nav-button"
          aria-label="เปิดเมนูผู้ดูแล"
          aria-expanded={mobileMenu}
          onClick={onToggleMenu}
        >
          <Icon name="menu" />
        </button>
        <Icon name="news" size={17} />
        <span>กองบรรณาธิการ</span>
        <b>/</b>
        <strong>{label}</strong>
      </div>
      <div>
        <span className="preview-badge">โหมดตัวอย่าง</span>
        <button
          className="icon-button"
          aria-label="ดูสถานะระบบ"
          onClick={onShowStatus}
        >
          <Icon name="bell" size={18} />
        </button>
        <span className="profile-avatar">WS</span>
        <span className="profile-label">
          ผู้ดูแลตัวอย่าง<small>กองบรรณาธิการ</small>
        </span>
      </div>
    </header>
  );
}
