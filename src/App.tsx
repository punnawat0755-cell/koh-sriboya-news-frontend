import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Admin from "./pages/Admin";
import About from "./pages/About";
import "./App.css";

function NewsPage() {
  const { slug } = useParams();
  return <NewsDetail key={slug} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <main className="container state" id="main-content">
                <h1>ไม่พบหน้าที่ต้องการ</h1>
                <Link to="/">กลับหน้าแรก</Link>
              </main>
            }
          />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
