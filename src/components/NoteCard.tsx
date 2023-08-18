import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { NoteCardProps } from "@/types";

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onRemove,
  onComplete,
}) => {
  return (
    <div
      className={`card card-style ${note.isComplete && "isComplete"}`}
      key={note.id}
    >
      <div className="card_content">
        <div>
          <h4>{note.title}</h4>
          <p>{note.description}</p>
        </div>
        {/* btn To mark card is complte */}
        <button className="btnCompelet" onClick={() => onComplete(note.id)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
      <div className="card_details">
        <span className="date">{note.date}</span>
        <div className="menu-app">
          <i className="bx bx-dots-horizontal-rounded"></i>

          {/* Actions such as edit & remove */}
          <ul className="options">
            <li onClick={() => onEdit(note.id, note.title, note.description)}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#ffffff" }}
              />
            </li>
            <li onClick={() => onRemove(note.id)}>
              {" "}
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
