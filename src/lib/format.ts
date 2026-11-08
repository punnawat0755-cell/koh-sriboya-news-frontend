export const categories = [
  "ข่าวชุมชน",
  "กิจกรรม",
  "ประกาศ",
  "สิ่งแวดล้อม",
  "อาชีพและเศรษฐกิจ",
  "ท่องเที่ยว",
  "ประวัติศาสตร์",
];
export const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date(date));
