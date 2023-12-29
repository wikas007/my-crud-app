// pages/index.tsx
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:5001/crud-app-cloud/us-central1';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', name: '', email: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getUsers`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await fetch(`${API_BASE_URL}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      // Fetch updated user list after adding a new user
      fetchData();
      setNewUser({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`${API_BASE_URL}/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      // Fetch updated user list after deleting a user
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CRUD Operations</h1>

      {/* Add User Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="mb-2">
            ID:
            <input
              className="border p-2 w-full"
              type="text"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            />
          </label>
          <label className="mb-2">
            Name:
            <input
              className="border p-2 w-full"
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </label>
          <label className="mb-2">
            Email:
            <input
              className="border p-2 w-full"
              type="text"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </label>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      {/* User List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <strong>ID:</strong> {user.id}, <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
              <button
                className="bg-red-500 text-white py-1 px-2 ml-2"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
