import { Icon } from "../Icon";

export function EditorialTasks({
  draftCount,
  categoryCount,
  onShowDrafts,
  onShowCategories,
  onCreateDraft,
}: {
  draftCount: number;
  categoryCount: number;
  onShowDrafts: () => void;
  onShowCategories: () => void;
  onCreateDraft: () => void;
}) {
  return (
    <aside className="admin-panel tasks-panel">
      <h2>โต๊ะข่าววันนี้</h2>
      <button onClick={onShowDrafts}>
        <Icon name="edit" size={17} />
        <span>ฉบับร่างบนเครื่อง</span>
        <b>{draftCount}</b>
      </button>
      <button onClick={onShowCategories}>
        <Icon name="folder" size={17} />
        <span>หมวดหมู่ที่มีข่าว</span>
        <b>{categoryCount}</b>
      </button>
      <hr />
      <h3>มีเรื่องดีที่อยากเล่า?</h3>
      <p>เริ่มต้นเขียนข่าว บันทึกไอเดียและเรื่องราวที่น่าสนใจของชุมชน</p>
      <button className="outline-button" onClick={onCreateDraft}>
        <Icon name="plus" size={16} />
        เขียนและบันทึกฉบับร่าง
      </button>
    </aside>
  );
}
