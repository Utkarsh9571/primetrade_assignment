import { useState } from "react";
import { createNote } from "../utils/api";

export default function NoteForm({ token, onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNote({ title, content }, token);
    if (res.success) {
      setTitle("");
      setContent("");
      onNoteCreated();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-slate p-6 rounded-xl shadow-soft transition"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition resize-none"
      />
      <button
        type="submit"
        className="w-full bg-mutedBlue dark:bg-accent text-white py-2 rounded-xl hover:scale-[1.02] transition-transform"
      >
        Add Note
      </button>
    </form>
  );
}
