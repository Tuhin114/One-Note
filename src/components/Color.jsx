/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
  const { notes, setNotes, selectedNote } = useContext(NotesContext);
  const changeColor = () => {
    console.log("CHange color clicked:", selectedNote);

    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.$id === selectedNote.$id
      );

      const updatedNote = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };

      const newNotes = [...notes];
      newNotes[currentNoteIndex] = updatedNote;
      setNotes(newNotes);

      db.notes.update(selectedNote.$id, {
        colors: JSON.stringify(color),
      });
    } catch (error) {
      alert("You must select a note before changing colors");
    }
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;
