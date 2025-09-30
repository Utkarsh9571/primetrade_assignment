import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function AppRoutes() {
  const { user, login } = useContext(AuthContext);

  if (!user) return <AuthForm onAuth={login} />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} />
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
