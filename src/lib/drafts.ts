export interface Draft {
  id: string;
  title: string;
  category: string;
  content: string;
  updatedAt: string;
}
export const draftKey = "sriboya-editor-drafts-v1";
export function readDrafts(): Draft[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(draftKey) || "[]");
    return Array.isArray(stored)
      ? stored.filter(
          (item): item is Draft =>
            item &&
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.category === "string" &&
            typeof item.content === "string" &&
            typeof item.updatedAt === "string",
        )
      : [];
  } catch {
    return [];
  }
}
