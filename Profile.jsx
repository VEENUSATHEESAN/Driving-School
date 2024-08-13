import React, { useState } from 'react';

function Profile() {
  const initialProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profilePicture: null,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const handleSave = () => {
    const newError = {};

    if (!profile.name) newError.name = 'Name is required';
    if (!profile.email) newError.email = 'Email is required';
    if (!profile.phone) newError.phone = 'Phone number is required';
    if (!profile.address) newError.address = 'Address is required';

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setIsEditing(false);
    setError({});
    console.log('Profile updated!', profile);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReset = () => {
    setProfile(initialProfile);
    setPassword('');
    setError({});
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (!password) {
      setError({ password: 'Please enter a new password' });
      return;
    }
    console.log('Password changed!');
    setPassword('');
    setError({});
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'profilePicture') {
      setProfile({ ...profile, [id]: files.length ? URL.createObjectURL(files[0]) : null });
    } else {
      setProfile({ ...profile, [id]: value });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {profile.profilePicture && (
            <div className="mt-2 relative">
              <img src={profile.profilePicture} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, profilePicture: null })}
                  className="absolute top-0 right-0 mt-2 mr-2 p-1 bg-red-500 text-white rounded-full focus:outline-none"
                >
                  &times;
                </button>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {error.name && <div className="text-red-500 text-sm">{error.name}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {error.phone && <div className="text-red-500 text-sm">{error.phone}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {error.address && <div className="text-red-500 text-sm">{error.address}</div>}
        </div>

        {isEditing && (
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handlePasswordChange}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
            {error.password && <div className="text-red-500 text-sm">{error.password}</div>}
          </div>
        )}

        {isEditing ? (
          <div className="space-x-4">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;
