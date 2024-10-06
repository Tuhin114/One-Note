import { createContext, useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NotesContext = createContext();

const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes on mount
    const init = async () => {
      try {
        const response = await db.notes.list();
        setNotes(response.documents); // Assuming response.documents contains the notes array
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNotes([]); // Optional: Set an empty array if the request fails
      } finally {
        setLoading(false); // Stop showing spinner after data is loaded or an error occurs
      }
    };

    init();
  }, []);

  // console.log("Fetched notes:", notes); // This might log [] initially

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </NotesContext.Provider>
  );
};

export default NoteProvider;
