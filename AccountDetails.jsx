import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phoneNo: '',
    gender: '',
    bio: '',
    userImage: ''
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      setError('No user ID found in local storage');
      setLoading(false);
      return;
    }
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (response.status === 200) {
          setUserDetails(response.data);
          setEditFormData({
            username: response.data.username,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            phoneNo: response.data.phoneNo,
            gender: response.data.gender,
            bio: response.data.bio,
            userImage: response.data.userImage
          });
        }
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({ ...editFormData, userImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, editFormData);
      if (response.status === 200) {
        setUserDetails(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Error updating profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  if (!userId) {
    return <p className="text-red-500">Error: No user ID found in local storage</p>;
  }

  return (
    <div className="account-details p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md max-w-xl mx-auto">
      <ToastContainer />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userDetails ? (
        <div>
          <div className="profile-picture mb-6 text-center">
            <img className="w-32 h-32 rounded-full mx-auto" src={`http://localhost:5000/${editFormData.userImage}`} alt={`${userDetails.username}'s profile`} />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            )}
          </div>
          <div className="details">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Username"
                />
                <input
                  type="text"
                  name="firstname"
                  value={editFormData.firstname}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastname"
                  value={editFormData.lastname}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phoneNo"
                  value={editFormData.phoneNo}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Phone Number"
                />
                <select
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  name="bio"
                  value={editFormData.bio}
                  onChange={handleChange}
                  className="input-field w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Bio"
                ></textarea>
                <button
                  onClick={handleSave}
                  className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Username:</strong> {userDetails.username}</p>
                <p><strong>First Name:</strong> {userDetails.firstname}</p>
                <p><strong>Last Name:</strong> {userDetails.lastname}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Phone No:</strong> {userDetails.phoneNo}</p>
                <p><strong>Gender:</strong> {userDetails.gender}</p>
                <p><strong>Bio:</strong> {userDetails.bio}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-secondary w-full p-2 bg-gray-500 text-white rounded mt-4"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default AccountDetails;
