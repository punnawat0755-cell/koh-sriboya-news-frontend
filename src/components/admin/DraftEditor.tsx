import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "../Icon";
import { categories } from "../../lib/format";
import type { Draft } from "../../lib/drafts";

export function DraftEditor({
  draft,
  onClose,
  onSave,
}: {
  draft: Partial<Draft>;
  onClose: () => void;
  onSave: (draft: Draft) => boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(draft.title || "");
  const [category, setCategory] = useState(draft.category || categories[0]);
  const [content, setContent] = useState(draft.content || "");
  const [error, setError] = useState("");
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("กรุณาระบุหัวข้อและเนื้อหาข่าว");
      return;
    }
    if (
      onSave({
        id: draft.id || crypto.randomUUID(),
        title: title.trim(),
        category,
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      })
    )
      onClose();
    else setError("บันทึกไม่ได้ กรุณาตรวจสอบพื้นที่จัดเก็บของเบราว์เซอร์");
  }
  return (
    <dialog
      ref={dialog}
      className="draft-dialog"
      onCancel={onClose}
      aria-labelledby="draft-title"
    >
      <form onSubmit={submit}>
        <div className="dialog-title">
          <div>
            <span className="section-kicker">EDITOR WORKSPACE</span>
            <h2 id="draft-title">
              {draft.id ? "แก้ไขฉบับร่าง" : "เขียนข่าวใหม่"}
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
          >
            <Icon name="close" />
          </button>
        </div>
        <p className="draft-note">
          ฉบับร่างจะบันทึกบนเบราว์เซอร์นี้ ยังไม่เผยแพร่บนเว็บไซต์
        </p>
        <label>
          หัวข้อข่าว
          <input
            autoFocus
            required
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เรื่องราวที่อยากบอกคนในชุมชน"
          />
        </label>
        <label>
          หมวดหมู่
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          เนื้อหาข่าว
          <textarea
            required
            rows={9}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="เขียนรายละเอียดข่าวที่นี่..."
          />
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          <button type="button" className="outline-button" onClick={onClose}>
            ยกเลิก
          </button>
          <button className="primary-button">บันทึกฉบับร่าง</button>
        </div>
      </form>
    </dialog>
  );
}
