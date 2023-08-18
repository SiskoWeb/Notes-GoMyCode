"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { Note } from "@/types";
import Header from "@/components/Header";
import { NoteCard } from "@/components/NoteCard";
import { NotePopup } from "@/components/NotePopup";
import { generateRandomId, getStoredNotes, storeNotes } from "@/utils/utils";


export default function Home() {


  const t = useTranslations("Index");

  // State variables for managing notes and popup
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
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

  useEffect(() => {
    const initialNotes = getStoredNotes();
    setNotes(initialNotes);
  }, []);



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

      // Update local storage after adding the note
      storeNotes([...notes, noteInfo]);
    }
  };

  // Function for remove not by passing thier id
  const handleRemoveNote = (idNote: string): void => {
    const confirmDelete: boolean = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      const updatedNotes: Note[] = notes.filter((note) => note.id !== idNote);
      setNotes(updatedNotes);

      // Update local storage after adding the note
      storeNotes(updatedNotes);
    }
  };

  // Function for eupdate note
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
    // Update local storage after adding the note
    storeNotes(updatedNotes);
  };

  return (
    <div className="app">
      {/* Lerts */}
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  "
        role="alert"
      >
        <span className="font-medium">I know!</span> ui is shit just ignore it i
        dont have time for it
      </div>

      <Header t={t} setFilter={setFilter} />

      <div className="cards">
        <button className="add card-style" onClick={handlePopupOpen}>
          <div className="plus">+</div>
          <h4>{t("btnAdd")}</h4>
        </button>

        {/* Display Notes */}
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => handleEditNote(note.id, note.title, note.description)}
            onRemove={() => handleRemoveNote(note.id)}
            onComplete={() => markNoteAsComplete(note.id)}
          />
        ))}
      </div>

      {/* PopUp */}
      {popupOpen && (
        <NotePopup
          t={t}
          isEdit={isEdit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onSubmit={handleAddNote}
          onCancel={() => setPopupOpen(false)}
        />
      )}
    </div>
  );
}
