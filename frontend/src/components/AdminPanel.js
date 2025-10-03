import AdminUserManager from './AdminUserManager';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminPanel({ token }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/admin/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setNotes(data.data);
  };

  const deleteNote = async id => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE}/admin/note/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Note deleted');
      fetchNotes();
    } catch (err) {
      toast.error('Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:px-10 lg:px-16 bg-warmWhite dark:bg-charcoal transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        <AdminUserManager token={token} />

        <section>
          <h2 className="text-2xl font-bold text-mutedBlue dark:text-accent mb-4">
            All Notes
          </h2>
          <ul className="space-y-4">
            {notes.map(note => (
              <li
                key={note._id}
                className="p-6 bg-white dark:bg-slate rounded-xl shadow-soft hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {note.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {note.content}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By: {note.user?.email}
                </p>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="mt-3 text-red-600 dark:text-red-400 hover:underline transition"
                >
                  Delete Note
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
