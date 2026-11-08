import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { logo, navigation } from "../../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <img src={logo} alt="" />
            <div>
              <strong>ข่าวเกาะศรีบอยา</strong>
              <small>ข่าวชุมชน เพื่อชุมชน ก้าวไปด้วยกัน</small>
            </div>
          </Link>
          <p>
            พื้นที่บอกเล่าเรื่องราวของผู้คน วิถีชีวิต และความงดงาม
            <br />
            ของตำบลเกาะศรีบอยา อำเภอเหนือคลอง จังหวัดกระบี่
          </p>
        </div>
        <div>
          <h3>หมวดหมู่ข่าว</h3>
          {navigation.slice(0, 4).map(([name, path]) => (
            <Link key={name} to={path}>
              {name}
            </Link>
          ))}
        </div>
        <div>
          <h3>รู้จักเรา</h3>
          <Link to="/about">เกี่ยวกับข่าวเกาะศรีบอยา</Link>
          <Link to="/about#contact">ติดต่อกองบรรณาธิการ</Link>
          <Link to="/admin">สำหรับผู้ดูแล</Link>
        </div>
        <div>
          <h3>ติดตามชุมชน</h3>
          <p>เรื่องราวใกล้บ้าน ที่อยากให้คุณรู้</p>
          <Link to="/about#contact" className="footer-contact">
            <Icon name="mail" size={17} /> ช่องทางติดต่อ
          </Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>
          © {new Date().getFullYear()} ข่าวเกาะศรีบอยา · ข่าวสารเพื่อชุมชน
        </span>
        <a href="#top">กลับด้านบน ↑</a>
      </div>
    </footer>
  );
}
