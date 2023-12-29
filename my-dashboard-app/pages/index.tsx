import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://127.0.0.1:5001/crud-app-cloud/us-central1';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setIsLoading(true);
      setError(null);

      if (!newUser.name.trim() || !isValidEmail(newUser.email)) {
        throw new Error('Please provide a valid name and email.');
      }

      if (editingUserId) {
        await fetch(`${API_BASE_URL}/updateUser`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...newUser, id: editingUserId }),
        });
        setEditingUserId(null);
      } else {
        const newUserWithId = { ...newUser, id: generateNewId() };
        await fetch(`${API_BASE_URL}/addUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUserWithId),
        });
      }

      fetchData();
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding/updating user:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewId = () => {
    return Date.now().toString();
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setNewUser({ name: user.name, email: user.email });
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

      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto p-4 bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-8">CRUD Operations</h1>

        <div className="bg-gray-100 p-4 rounded mb-8">
          <h2 className="text-2xl font-bold mb-4">Add User</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-4">
              {/* ID field removed */}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name:</label>
              <input
                className="mt-1 p-2 border rounded-md w-full"
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email:</label>
              <input
                className="mt-1 p-2 border rounded-md w-full"
                type="text"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
          </div>
          <button
            className={`bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleAddUser}
          >
            {isLoading ? 'Adding...' : editingUserId ? 'Update User' : 'Add User'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">User List</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white border p-4 mb-4 rounded flex justify-between items-center sm:items-start"
              >
                <div className="mb-4 sm:mb-0">
                  <strong>ID:</strong> {user.id}, <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white py-1 px-2 ml-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 ml-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
