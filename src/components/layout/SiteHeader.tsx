import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { useState } from "react";
import { logo, navigation } from "../../lib/site";

export function SiteHeader() {
  const [search, setSearch] = useState(false);
  return (
    <>
      <div id="top" className="site-topline" />
      <header className="masthead container">
        <Link to="/" className="brand">
          <img src={logo} alt="โลโก้ข่าวเกาะศรีบอยา" />
          <div>
            <strong>ข่าวเกาะศรีบอยา</strong>
            <small>ข่าวชุมชน เพื่อชุมชน ก้าวไปด้วยกัน</small>
          </div>
        </Link>
        <div className="brand-en">
          <b>SRI BOYA LOCAL NEWS</b>
          <span>ตำบลเกาะศรีบอยา · จังหวัดกระบี่</span>
        </div>
      </header>
      <nav className="site-nav" aria-label="เมนูหลัก">
        <div className="container nav-inner">
          <Link to="/" aria-label="หน้าแรก" className="home-icon">
            <Icon name="home" size={18} />
          </Link>
          {navigation.map(([name, path]) => (
            <Link to={path} key={name}>
              {name}
            </Link>
          ))}
          <button
            className="nav-search"
            onClick={() => setSearch(!search)}
            aria-expanded={search}
          >
            <Icon name="search" size={17} />
            <span>ค้นหาข่าว</span>
          </button>
        </div>
      </nav>
      {search && (
        <form action="/" className="container nav-search-form">
          <input
            type="search"
            name="q"
            autoFocus
            aria-label="ค้นหาข่าว"
            placeholder="ค้นหาเรื่องราวในชุมชน..."
          />
          <button className="primary-button">ค้นหา</button>
        </form>
      )}
    </>
  );
}
