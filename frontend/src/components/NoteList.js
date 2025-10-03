import { useState } from 'react';
import { deleteNote, updateNote } from '../utils/api';

export default function NoteList({ notes, token, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  const handleDelete = async id => {
    await deleteNote(id, token);
    onRefresh();
  };

  const startEdit = note => {
    setEditingId(note._id);
    setEditForm({ title: note.title, content: note.content });
  };

  const handleUpdate = async id => {
    await updateNote(id, editForm, token);
    setEditingId(null);
    onRefresh();
  };

  return (
    <div className="mt-6 space-y-6">
      {notes.map(note => (
        <div
          key={note._id}
          className="p-6 bg-white dark:bg-slate rounded-xl shadow-soft hover:shadow-md transition"
        >
          {editingId === note._id ? (
            <>
              <input
                value={editForm.title}
                onChange={e =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Title"
                className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-charcoal text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
              />
              <textarea
                value={editForm.content}
                onChange={e =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
                placeholder="Content"
                rows={4}
                className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-charcoal text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition resize-none"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => handleUpdate(note._id)}
                  className="px-4 py-2 bg-mutedBlue dark:bg-accent text-white rounded-xl hover:scale-[1.02] transition-transform"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-500 dark:text-gray-400 underline hover:opacity-80 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {note.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
              <div className="mt-4 flex gap-6">
                <button
                  onClick={() => startEdit(note)}
                  className="text-mutedBlue dark:text-accent underline hover:opacity-80 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 dark:text-red-400 underline hover:opacity-80 transition"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
