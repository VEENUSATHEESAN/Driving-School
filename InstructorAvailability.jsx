import React, { useState, useContext } from 'react';
import { ScheduleContext } from './ScheduleContext';
import './InstructorAvailability.css';

const InstructorAvailability = () => {
  const { availability, addAvailability, updateAvailability, deleteAvailability } = useContext(ScheduleContext);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState({ instructor: '', date: '', startTime: '', endTime: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSlot) {
      updateAvailability({ ...form, id: editingSlot.id });
      setEditingSlot(null);
    } else {
      addAvailability({ ...form, id: Date.now() });
    }
    setForm({ instructor: '', date: '', startTime: '', endTime: '' });
  };

  const handleEdit = (slot) => {
    setForm(slot);
    setEditingSlot(slot);
  };

  const handleDelete = (slotId) => {
    deleteAvailability(slotId);
  };

  return (
    <div className="instructor-availability">
      <h2>Instructor Availability</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Instructor:</label>
          <input
            type="text"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          />
        </div>
        <button type="submit">{editingSlot ? 'Update Availability' : 'Add Availability'}</button>
        {editingSlot && <button type="button" onClick={() => setEditingSlot(null)}>Cancel Edit</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.instructor}</td>
              <td>{slot.date}</td>
              <td>{slot.startTime}</td>
              <td>{slot.endTime}</td>
              <td>
                <button onClick={() => handleEdit(slot)}>Edit</button>
                <button onClick={() => handleDelete(slot.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorAvailability;
