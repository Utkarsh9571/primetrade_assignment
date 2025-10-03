import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (token && role) {
      setUser({ token, role, name });
    }
  }, []);

  const login = userData => {
    const { token, user } = userData || {};
    if (!token || !user?.role || !user?.firstName) {
      console.error('Invalid login response:', userData);
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('name', user.firstName);
    setUser({ token, role: user.role, name: user.firstName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
