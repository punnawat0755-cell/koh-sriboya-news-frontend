import { useSearchParams } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { NewsTicker } from "../components/news/NewsTicker";
import { NewsFilters } from "../components/news/NewsFilters";
import { NewsResults } from "../components/news/NewsResults";
import { HomeStories } from "../components/news/HomeStories";
import { TravelNews } from "../components/news/TravelNews";
import { CommunityNotices } from "../components/news/CommunityNotices";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const { news, loading, error, source, retry } = useNews(params.toString());
  const filtered = Boolean(
    params.get("category") ||
    params.get("q") ||
    params.get("date") ||
    params.get("view"),
  );
  const travel = news
    .filter((item) => item.category === "ท่องเที่ยว")
    .slice(0, 3);
  const notices = news.filter((item) => item.category === "ประกาศ");
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };
  return (
    <>
      <NewsTicker latest={news[0]} />
      <main id="main-content">
        <div className="container">
          <div className="edition-line">
            <span>เรื่องราวจากเกาะของเรา</span>
            <small>
              {source === "sample"
                ? "ฉบับตัวอย่าง · ข่าวและภาพประกอบเพื่อสาธิต"
                : "ข่าวชุมชน เพื่อชุมชน ก้าวไปด้วยกัน"}
            </small>
          </div>
          {filtered && (
            <NewsFilters
              params={params}
              onChange={update}
              onReset={() => setParams({})}
            />
          )}
          {loading ? (
            <div className="state" role="status">
              กำลังโหลดข่าวในชุมชน…
            </div>
          ) : error ? (
            <div className="state" role="alert">
              <h2>ยังโหลดข่าวไม่ได้</h2>
              <p>{error}</p>
              <button className="primary-button" onClick={retry}>
                ลองอีกครั้ง
              </button>
            </div>
          ) : filtered ? (
            <NewsResults news={news} />
          ) : (
            <HomeStories news={news} />
          )}
        </div>
        {!filtered && !loading && !error && (
          <>
            <TravelNews travel={travel} />
            <CommunityNotices notices={notices} />
          </>
        )}
      </main>
    </>
  );
}
