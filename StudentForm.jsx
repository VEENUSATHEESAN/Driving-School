import React, { useState, useEffect } from 'react';

function StudentForm({ student, onSave, onCancelEdit, theme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setPhone(student.phone);
      setAddress(student.address);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: student ? student.id : undefined,
      name,
      email,
      phone,
      address,
    });
  };

  return (
    <div className="student-form">
      <h2 className="text-xl font-semibold mb-4">{student ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded w-full`}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded w-full`}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={`mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded w-full`}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={`mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded w-full`}
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{student ? 'Save' : 'Add'}</button>
          <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
