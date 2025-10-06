import { useState } from 'react';
import { loginOrSignup } from '../utils/api.js';

export default function AuthForm({ onAuth }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginOrSignup(form, isSignup);
    if (data.success && data.data.token) {
      localStorage.setItem('token', data.data.token);
      onAuth(data.data);
    } else {
      alert(data.message || 'Authentication failed');
    }
    console.log('Auth response:', data);
  };

  return (
    <div className="min-h-screen bg-warmWhite dark:bg-charcoal flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate p-6 rounded-xl shadow-soft hover:shadow-md transition">
        <h2 className="text-2xl font-bold text-mutedBlue dark:text-accent mb-6 text-center">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
              />
            </>
          )}
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-softGray dark:bg-slate text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-mutedBlue dark:focus:ring-accent transition"
          />
          <button
            type="submit"
            className="w-full bg-mutedBlue dark:bg-accent text-white py-2 rounded-xl hover:scale-[1.02] transition-transform"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-2 text-mutedBlue dark:text-accent underline hover:opacity-80 transition"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
