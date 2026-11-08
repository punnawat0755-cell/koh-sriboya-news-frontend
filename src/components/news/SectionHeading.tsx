import { Link } from "react-router-dom";

export function SectionHeading({ title, to }: { title: string; to: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <Link to={to}>
        ดูทั้งหมด <span>→</span>
      </Link>
    </div>
  );
}
