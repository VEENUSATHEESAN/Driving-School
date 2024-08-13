import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = ({ theme }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: 'User' });
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usermanagement');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/usermanagement/${currentUserId}`, newUser);
        toast.success('User updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/usermanagement', newUser);
        toast.success('User added successfully!');
      }
      setNewUser({ name: '', role: 'User' });
      setEditMode(false);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
      toast.error('Error submitting user.');
    }
  };

  const handleEdit = (user) => {
    setNewUser({ name: user.name, role: user.role });
    setEditMode(true);
    setCurrentUserId(user._id);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/usermanagement/${userId}`);
      fetchUsers();
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user.');
    }
  };

  return (
    <div className={`user-management-container ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          className={`border px-3 py-2 mr-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
          required
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          className={`border px-3 py-2 mr-2 rounded ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
          required
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button 
          type="submit"
          className={`px-4 py-2 rounded ${editMode ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}>
          {editMode ? 'Update' : 'Add'} User
        </button>
      </form>
      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className={`user-item flex justify-between items-center p-2 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
            <span>{user.name} - {user.role}</span>
            <div className="space-x-2">
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
