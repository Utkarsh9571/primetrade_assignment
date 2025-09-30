import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchNotes } from "../utils/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import useThemeToggle from "../hooks/useThemeToggle";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [isDark, toggleTheme] = useThemeToggle();

  const loadNotes = async () => {
    const res = await fetchNotes(user.token);
    if (res.success) {
      const notesArray = Array.isArray(res.data[0]) ? res.data[0] : res.data;
      setNotes(notesArray);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-warmWhite dark:bg-charcoal px-4 py-10 transition-colors duration-300">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-mutedBlue dark:text-accent">
            Welcome, {user.name}
          </h1>
          <div className="flex justify-end gap-4 w-1/2">
            <button
              onClick={logout}
              className="text-red-600 dark:text-red-400 underline hover:opacity-80 transition"
            >
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="text-mutedBlue dark:text-accent underline hover:opacity-80 transition"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
        <NoteForm token={user.token} onNoteCreated={loadNotes} />
        <NoteList notes={notes} token={user.token} onRefresh={loadNotes} />
      </div>
    </div>
  );
}
