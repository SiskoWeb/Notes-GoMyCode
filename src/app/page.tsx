"use client";
import React, { useState, useEffect } from "react";

// Define the Note interface to represent a note object
interface Note {
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
  id: string;
}

const App: React.FC = () => {
  // State variables for managing notes and popup
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const storedNotes = localStorage.getItem("notes");
  const initialNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "complete" | "incomplete">(
    "all"
  );

  // Array to hold month names
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to generate a random ID for notes
  const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Save notes to local storage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Filter notes based on the selected filter
  const filteredNotes: Note[] =
    filter === "all"
      ? notes
      : notes.filter((note) => note.isComplete === (filter === "complete"));

  // Function to open the popup for adding/editing notes
  const handlePopupOpen = (): void => {
    setPopupOpen(true);
    setTitle("");
    setDescription("");
  };

  // Function to close the popup
  const handlePopupClose = (): void => {
    setPopupOpen(false);
    setIsEdit(false);
  };

  // Function to add or update a note
  const handleAddNote = (e: React.FormEvent): void => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      const date: Date = new Date();
      const month: string = months[date.getMonth()];
      const day: number = date.getDate();
      const year: number = date.getFullYear();

      const noteInfo: Note = {
        title,
        description,
        date: `${month}, ${day}, ${year}`,
        isComplete: false,
        id: generateRandomId(),
      };

      if (isEdit) {
        const updatedNotes: Note[] = notes.map((note) =>
          note.id === idEdit ? { ...note, ...noteInfo } : note
        );
        setNotes(updatedNotes);
        setIsEdit(false);
      } else {
        setNotes([...notes, noteInfo]);
      }

      setPopupOpen(false);
    }
  };

  const handleRemoveNote = (idNote: string): void => {
    const confirmDelete: boolean = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      const updatedNotes: Note[] = notes.filter(
        (note) => String(note.id) !== idNote
      );
      setNotes(updatedNotes);
    }
  };

  const handleEditNote = (
    idNote: string,
    title: string,
    description: string
  ): void => {
    setIsEdit(true);
    setIdEdit(idNote);
    setTitle(title);
    setDescription(description);
    setPopupOpen(true);
  };

  const markNoteAsComplete = (id: string): void => {
    const updatedNotes: Note[] = notes.map((note) =>
      note.id === id ? { ...note, isComplete: !note.isComplete } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>🤩 Notes</h1>
      </div>

      <div className="filtter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("complete")}>Complete</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <div className="cards">
        <button className="add card-style" onClick={handlePopupOpen}>
          <div className="plus">+</div>
          <h4>Add a new note</h4>
        </button>

        {/* Display Notes */}
        {filteredNotes.map((note, index) => (
          <div
            className={`card card-style ${note.isComplete && "isComplete"}`}
            key={note.id}
          >
            <div className="card_content">
              <div>
                <h4>{note.title}</h4>
                <p>{note.description}</p>
              </div>
              <button
                className="btnCompelet"
                onClick={() => markNoteAsComplete(note.id)}
              >
                Done
              </button>
            </div>
            <div className="card_details">
              <span className="date">{note.date}</span>
              <div className="menu-app">
                <i className="bx bx-dots-horizontal-rounded"></i>
                <ul className="options">
                  <li
                    onClick={() =>
                      handleEditNote(note.id, note.title, note.description)
                    }
                  >
                    Update
                  </li>
                  <li onClick={() => handleRemoveNote(note.id)}>Delete</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {popupOpen && (
        <div className="popup-app">
          <div className="popup">
            <div className="header_popup">
              <h4>{isEdit ? "Note update" : "Add a new note"}</h4>
              <button onClick={handlePopupClose}>Close</button>
            </div>
            <form onSubmit={handleAddNote}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button type="submit">{isEdit ? "Update" : "Add"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
