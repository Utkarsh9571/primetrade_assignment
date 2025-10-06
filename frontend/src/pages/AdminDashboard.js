import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import AdminPanel from '../components/AdminPanel.js';
import useThemeToggle from '../hooks/useThemeToggle.js';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [isDark, toggleTheme] = useThemeToggle();

  return (
    <div className="min-h-screen bg-warmWhite dark:bg-charcoal px-4 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-mutedBlue dark:text-accent">
            Admin Dashboard
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
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
        <AdminPanel token={user.token} />
      </div>
    </div>
  );
}
