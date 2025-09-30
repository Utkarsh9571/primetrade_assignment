import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminUserManager({ token }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE}/admin/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.success) setUsers(res.data.data);
  };

  const promoteUser = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE}/admin/user/${id}`,
        { role: "admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(`Promoted ${res.data.data.email} to admin`);
        fetchUsers();
      } else {
        toast.error("Failed to promote user");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-mutedBlue dark:text-accent">
        Manage Users
      </h2>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center p-2 border-b dark:border-gray-700"
        >
          <span className="text-sm text-gray-500">{user.email}</span>
          <span className="text-sm text-gray-500">{user.role}</span>
          {user.role !== "admin" && (
            <button
              onClick={() => promoteUser(user._id)}
              className="text-blue-600 dark:text-blue-400 underline hover:opacity-80 transition"
            >
              Make Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
