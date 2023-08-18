// Define the Note interface to represent a note object
export interface Note {
    title: string;
    description: string;
    date: string;
    isComplete: boolean;
    id: string;
  }




  export interface NoteCardProps {
    note: Note;
    onEdit: any;
    onRemove: any;
    onComplete: any;
  }

  export interface NotePopupProps {
    t: any;
    isEdit: boolean;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
  }