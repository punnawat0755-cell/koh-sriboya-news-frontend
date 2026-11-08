import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        ข้ามไปยังเนื้อหา
      </a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
