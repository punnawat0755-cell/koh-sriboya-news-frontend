export function VisitorsChart({
  range,
  setRange,
}: {
  range: string;
  setRange: (range: string) => void;
}) {
  return (
    <section className="admin-panel chart-panel">
      <div className="panel-heading">
        <div>
          <h2>ผู้เข้าชมเว็บไซต์ของเรา</h2>
          <p>
            <i />
            ตัวอย่างรูปแบบกราฟ · ไม่ใช่ยอดเข้าชมจริง
          </p>
        </div>
        <select
          aria-label="ช่วงเวลาตัวอย่างกราฟ"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="30">30 วัน</option>
          <option value="7">7 วัน</option>
        </select>
      </div>
      <div className="chart-legend">
        ยอดเข้าชมหน้าเว็บ <span>ตัวอย่างสถิติ</span>
      </div>
      <svg
        className="visitors-chart"
        viewBox="0 0 700 220"
        role="img"
        aria-label={`ตัวอย่างกราฟยอดเข้าชม ${range} วัน ยังไม่มีการเก็บยอดจริง`}
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#048fbb" stopOpacity=".22" />
            <stop offset="100%" stopColor="#048fbb" stopOpacity=".02" />
          </linearGradient>
        </defs>
        {[30, 75, 120, 165].map((y, i) => (
          <g key={y}>
            <line x1="45" y1={y} x2="690" y2={y} stroke="#eaf0f4" />
            <text x="8" y={y + 4} fill="#99a7b1" fontSize="10">
              {i === 3 ? "0" : `${3 - i},000`}
            </text>
          </g>
        ))}
        <path
          d={
            range === "30"
              ? "M45 190L45 150 70 132 95 140 120 131 145 141 170 147 195 126 220 128 245 116 270 122 295 100 320 108 345 110 370 121 395 104 420 111 445 94 470 95 495 74 520 84 545 71 570 79 595 58 620 80 645 64 665 111 690 26L690 190Z"
              : "M45 190L45 150 150 125 255 141 360 82 470 102 580 55 690 26L690 190Z"
          }
          fill="url(#chart-fill)"
        />
        <path
          d={
            range === "30"
              ? "M45 150 70 132 95 140 120 131 145 141 170 147 195 126 220 128 245 116 270 122 295 100 320 108 345 110 370 121 395 104 420 111 445 94 470 95 495 74 520 84 545 71 570 79 595 58 620 80 645 64 665 111 690 26"
              : "M45 150 150 125 255 141 360 82 470 102 580 55 690 26"
          }
          fill="none"
          stroke="#008db8"
          strokeWidth="2"
        />
        {[
          "เริ่มต้น",
          range === "30" ? "สัปดาห์ที่ 1" : "วันที่ 2",
          range === "30" ? "สัปดาห์ที่ 2" : "วันที่ 4",
          range === "30" ? "สัปดาห์ที่ 3" : "วันที่ 6",
          "ล่าสุด",
        ].map((label, i) => (
          <text
            key={label}
            x={45 + i * 151}
            y="212"
            fill="#9aa8b1"
            fontSize="10"
          >
            {label}
          </text>
        ))}
      </svg>
    </section>
  );
}
