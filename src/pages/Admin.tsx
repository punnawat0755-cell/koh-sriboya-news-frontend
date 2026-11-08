import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { useNews } from "../hooks/useNews";
import { dateLabel } from "../lib/format";
import { draftKey, readDrafts, type Draft } from "../lib/drafts";
import { menu } from "../components/admin/adminMenu";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { AdminTopbar } from "../components/admin/AdminTopbar";
import { AdminStats } from "../components/admin/AdminStats";
import { VisitorsChart } from "../components/admin/VisitorsChart";
import { EditorialTasks } from "../components/admin/EditorialTasks";
import { ArticlesTable } from "../components/admin/ArticlesTable";
import { AdminCategories } from "../components/admin/AdminCategories";
import { AdminMedia } from "../components/admin/AdminMedia";
import { AdminHelp } from "../components/admin/AdminHelp";
import { DraftEditor } from "../components/admin/DraftEditor";

export default function Admin() {
  const [params, setParams] = useSearchParams();
  const section = params.get("section") || "overview";
  const { news, loading, error, retry, source } = useNews();
  const [drafts, setDrafts] = useState<Draft[]>(readDrafts);
  const [editor, setEditor] = useState<Partial<Draft> | null>(null);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState("30");
  const [mobileMenu, setMobileMenu] = useState(false);
  const setSection = (value: string) => {
    setParams(value === "overview" ? {} : { section: value });
    setMobileMenu(false);
    setQuery("");
  };
  useEffect(() => {
    document.title = "ภาพรวมผู้ดูแล | ข่าวเกาะศรีบอยา";
    return () => {
      document.title = "ข่าวเกาะศรีบอยา | ข่าวชุมชน";
    };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(timeout);
  }, [toast]);
  function saveDraft(draft: Draft) {
    const next = [draft, ...drafts.filter((item) => item.id !== draft.id)];
    try {
      localStorage.setItem(draftKey, JSON.stringify(next));
      setDrafts(next);
      setToast("บันทึกฉบับร่างบนเบราว์เซอร์นี้แล้ว");
      return true;
    } catch {
      return false;
    }
  }
  const categoryCount = new Set(news.map((item) => item.category)).size;
  const label = menu.find(([id]) => id === section)?.[2] || "คู่มือการใช้งาน";
  const openDraft = () => setEditor({});
  const tableProps = {
    news,
    drafts,
    query,
    status,
    onQueryChange: setQuery,
    onStatusChange: setStatus,
    onEdit: setEditor,
  };
  return (
    <div className="admin-layout">
      <a className="skip-link" href="#admin-main">
        ข้ามไปยังเนื้อหา
      </a>
      <AdminSidebar
        section={section}
        mobileMenu={mobileMenu}
        total={news.length + drafts.length}
        onSelect={setSection}
      />
      <div className="admin-content">
        <AdminTopbar
          label={label}
          mobileMenu={mobileMenu}
          onToggleMenu={() => setMobileMenu(!mobileMenu)}
          onShowStatus={() =>
            setToast("ยังไม่ได้เปิดใช้งานระบบแจ้งเตือนและการเก็บยอดเข้าชม")
          }
        />
        <main className="admin-main" id="admin-main">
          <div className="admin-page-heading">
            <div>
              <h1>{section === "overview" ? "สวัสดี ทีมข่าว" : label}</h1>
              <p>
                {section === "overview"
                  ? "ภาพรวมกองบรรณาธิการ"
                  : "จัดการเรื่องราวและข้อมูลของชุมชน"}{" "}
                · {dateLabel(new Date().toISOString())}
              </p>
            </div>
            <button className="primary-button" onClick={openDraft}>
              <Icon name="plus" size={18} />
              เขียนข่าวใหม่
            </button>
          </div>
          <div className="admin-demo-note">
            หน้าผู้ดูแลฉบับตัวอย่าง ·{" "}
            {source === "sample" ? "ข้อมูลข่าวสาธิต" : "ข้อมูลข่าวจาก API"} ·
            ฉบับร่างบันทึกเฉพาะเบราว์เซอร์นี้
          </div>
          {loading ? (
            <div role="status" className="state">
              กำลังโหลดข้อมูล…
            </div>
          ) : error ? (
            <div className="state" role="alert">
              <p>{error}</p>
              <button className="primary-button" onClick={retry}>
                ลองอีกครั้ง
              </button>
            </div>
          ) : (
            <>
              {section === "overview" && (
                <>
                  <AdminStats
                    newsCount={news.length}
                    draftCount={drafts.length}
                    categoryCount={categoryCount}
                  />
                  <div className="dashboard-middle">
                    <VisitorsChart range={range} setRange={setRange} />
                    <EditorialTasks
                      draftCount={drafts.length}
                      categoryCount={categoryCount}
                      onShowDrafts={() => {
                        setSection("news");
                        setStatus("draft");
                      }}
                      onShowCategories={() => setSection("categories")}
                      onCreateDraft={openDraft}
                    />
                  </div>
                  <ArticlesTable
                    {...tableProps}
                    onViewAll={() => setSection("news")}
                  />
                </>
              )}
              {section === "news" && <ArticlesTable {...tableProps} />}
              {section === "categories" && <AdminCategories news={news} />}
              {section === "media" && <AdminMedia news={news} />}
              {!["overview", "news", "categories", "media"].includes(
                section,
              ) && <AdminHelp />}
            </>
          )}
          <p className="admin-footnote">
            <Icon name="clock" size={13} />
            ข้อมูลข่าวอ่านจาก API · ฉบับร่างบนเครื่องไม่ได้ส่งไปยังฐานข้อมูล
          </p>
          <footer className="admin-footer">
            © {new Date().getFullYear()} ข่าวเกาะศรีบอยา · ระบบจัดการข่าว
            <span>ฉบับออกแบบ</span>
          </footer>
        </main>
      </div>
      {editor && (
        <DraftEditor
          draft={editor}
          onClose={() => setEditor(null)}
          onSave={saveDraft}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
