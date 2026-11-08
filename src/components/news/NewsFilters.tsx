import { Icon } from "../Icon";
import { categories } from "../../lib/format";

export function NewsFilters({
  params,
  onChange,
  onReset,
}: {
  params: URLSearchParams;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}) {
  return (
    <section className="filter-panel" aria-label="ค้นหาและกรองข่าว">
      <div>
        <h1>
          {params.get("category") ||
            (params.get("view") ? "ข่าวล่าสุด" : "ค้นหาข่าว")}
        </h1>
        <p>เรื่องราวที่คุณสนใจ จากชุมชนของเรา</p>
      </div>
      <div className="filter-inputs">
        <label>
          <Icon name="search" size={18} />
          <input
            aria-label="ค้นหาข่าว"
            placeholder="ค้นหาข่าว..."
            value={params.get("q") || ""}
            onChange={(e) => onChange("q", e.target.value)}
          />
        </label>
        <label>
          วันที่
          <input
            aria-label="วันที่เผยแพร่"
            type="date"
            value={params.get("date") || ""}
            onChange={(e) => onChange("date", e.target.value)}
            onBlur={(e) => {
              if (e.target.value !== (params.get("date") || ""))
                onChange("date", e.target.value);
            }}
          />
        </label>
        <button onClick={onReset} className="text-button">
          ล้างตัวกรอง ×
        </button>
      </div>
      <div className="filter-chips">
        {categories.map((name) => (
          <button
            className={params.get("category") === name ? "selected" : ""}
            onClick={() =>
              onChange("category", params.get("category") === name ? "" : name)
            }
            key={name}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
