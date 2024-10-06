// import { fakeData as notes } from "../assets/fakeData";
import { useContext } from "react";
import NoteCard from "../components/NoteCard";
import { NoteContext } from "../context/NoteContext";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div>
      {notes.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
    </div>
  );
};

export default NotesPage;
