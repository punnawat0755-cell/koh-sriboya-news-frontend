export interface News {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  imageAlt: string;
  author: string;
  publishedAt: string;
  featured: boolean;
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, { signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new Error(
      "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบว่า Backend เปิดอยู่",
    );
  }
  if (!response.ok)
    throw new Error(
      response.status === 404
        ? "ไม่พบข่าวที่ต้องการ"
        : "เซิร์ฟเวอร์ยังไม่พร้อม กรุณาลองอีกครั้ง",
    );
  try {
    return (await response.json()) as T;
  } catch {
    throw new Error("ได้รับข้อมูลไม่ถูกต้อง กรุณาตรวจสอบการเชื่อมต่อ API");
  }
}

export const getNews = (params: URLSearchParams, signal?: AbortSignal) =>
  request<{ data: News[]; source: string }>(`/news?${params}`, signal);
export const getNewsDetail = (slug: string, signal?: AbortSignal) =>
  request<{ data: News; source: string }>(
    `/news/${encodeURIComponent(slug)}`,
    signal,
  );
