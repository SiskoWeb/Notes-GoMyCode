import { Note } from "@/types";

// Define utility functions here
export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getStoredNotes = (): Note[] => {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
};

export const storeNotes = (updatedNotes: Note[]): void => {
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
