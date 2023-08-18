import React from "react";

interface NotePopupProps {
  t: any;
  isEdit: boolean;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const NotePopup: React.FC<NotePopupProps> = ({
  t,
  isEdit,
  title,
  setTitle,
  description,
  setDescription,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="popup-app">
      <div className="popup">
        <div className="header_popup">
          <h4>{isEdit ? `${t("updateTitle")}` : `${t("btnAdd")}`}</h4>
          <button onClick={onCancel}>Close</button>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label>{t("inputTitle")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>{t("inputDescription")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">{isEdit ? `${t("btnUpdate")}` : "Add"}</button>
        </form>
      </div>
    </div>
  );
};
