import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VehicleContext } from './VehicleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEditVehicle.css';

const AddEditVehicle = ({ theme }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addVehicle, updateVehicle, getVehicleById } = useContext(VehicleContext);
  const [vehicle, setVehicle] = useState({ name: '', type: '', availability: 'Available' });

  useEffect(() => {
    if (id) {
      const vehicleToEdit = getVehicleById(id);
      if (vehicleToEdit) {
        setVehicle(vehicleToEdit);
      }
    }
  }, [id, getVehicleById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateVehicle(vehicle);
      toast.success('Vehicle updated successfully!');
    } else {
      addVehicle(vehicle);
      toast.success('Vehicle added successfully!');
    }
    navigate('/vehicle-management/vehicleList');
  };

  return (
    <div className={`add-edit-vehicle ${theme}`}>
      <h1 className="text-2xl font-semibold">{id ? 'Edit Vehicle' : 'Add Vehicle'}</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            value={vehicle.name}
            onChange={(e) => setVehicle({ ...vehicle, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block">Type:</label>
          <input
            type="text"
            className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            value={vehicle.type}
            onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block">Availability:</label>
          <select
            className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            value={vehicle.availability}
            onChange={(e) => setVehicle({ ...vehicle, availability: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <button className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-700" type="submit">
          {id ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default AddEditVehicle;
