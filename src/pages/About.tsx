import { Link } from "react-router-dom";
import { logo } from "../lib/site";

export default function About() {
  return (
    <main className="container about-page" id="main-content">
      <span className="section-kicker">SRI BOYA LOCAL NEWS</span>
      <h1>ข่าวเกาะศรีบอยา</h1>
      <p>ข่าวชุมชน เพื่อชุมชน ก้าวไปด้วยกัน</p>
      <img
        src={logo}
        alt="ข่าวเกาะศรีบอยา ตำบลเกาะศรีบอยา อำเภอเหนือคลอง จังหวัดกระบี่"
      />
      <h2 id="contact">ติดต่อกองบรรณาธิการ</h2>
      <p>
        ช่องทางรับข่าวและติดต่อกองบรรณาธิการจะประกาศที่นี่เมื่อเปิดใช้งานเว็บไซต์
      </p>
      <p className="muted">
        ขณะนี้เป็นเว็บไซต์ฉบับตัวอย่าง
        ข่าวและภาพประกอบใช้สำหรับแสดงรูปแบบของเว็บไซต์
      </p>
      <Link className="text-link" to="/">
        กลับหน้าแรก →
      </Link>
    </main>
  );
}
