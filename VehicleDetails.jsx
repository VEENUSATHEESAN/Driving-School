import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VehicleContext } from './VehicleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VehicleDetails.css';

const VehicleDetails = ({ theme }) => {
  const { id } = useParams();
  const { getVehicleById, updateVehicle } = useContext(VehicleContext);
  const vehicle = getVehicleById(id);
  const [newMaintenance, setNewMaintenance] = useState({ date: '', description: '', id: Date.now() });
  const [isEditing, setIsEditing] = useState(false);
  const [editMaintenance, setEditMaintenance] = useState({ date: '', description: '', id: null });

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  const handleAddMaintenance = () => {
    const updatedVehicle = {
      ...vehicle,
      maintenanceHistory: [...vehicle.maintenanceHistory, newMaintenance]
    };
    updateVehicle(updatedVehicle);
    toast.success('Maintenance added successfully!');
    setNewMaintenance({ date: '', description: '', id: Date.now() });
  };

  const handleEditMaintenance = (maintenance) => {
    setIsEditing(true);
    setEditMaintenance(maintenance);
  };

  const handleSaveEdit = () => {
    const updatedVehicle = {
      ...vehicle,
      maintenanceHistory: vehicle.maintenanceHistory.map(m =>
        m.id === editMaintenance.id ? editMaintenance : m
      )
    };
    updateVehicle(updatedVehicle);
    toast.success('Maintenance updated successfully!');
    setIsEditing(false);
    setEditMaintenance({ date: '', description: '', id: null });
  };

  const handleDeleteMaintenance = (maintenanceId) => {
    const updatedVehicle = {
      ...vehicle,
      maintenanceHistory: vehicle.maintenanceHistory.filter(m => m.id !== maintenanceId)
    };
    updateVehicle(updatedVehicle);
    toast.success('Maintenance deleted successfully!');
  };

  return (
    <div className={`vehicle-details ${theme}`}>
      <h1 className="text-2xl font-semibold">{vehicle.name} Details</h1>
      <p>Type: {vehicle.type}</p>
      <p>Availability: {vehicle.availability}</p>
      <h2 className="text-xl mt-4">Maintenance History</h2>
      <ul className="mt-2 space-y-2">
        {vehicle.maintenanceHistory.map(maintenance => (
          <li key={maintenance.id} className="flex items-center space-x-4">
            {maintenance.date} - {maintenance.description}
            <button
              className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700"
              onClick={() => handleEditMaintenance(maintenance)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
              onClick={() => handleDeleteMaintenance(maintenance.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-xl mt-4">{isEditing ? 'Edit Maintenance' : 'Add Maintenance'}</h3>
      <input
        type="date"
        className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        value={isEditing ? editMaintenance.date : newMaintenance.date}
        onChange={e => isEditing ?
          setEditMaintenance({ ...editMaintenance, date: e.target.value }) :
          setNewMaintenance({ ...newMaintenance, date: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Description"
        className={`border rounded px-2 py-1 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        value={isEditing ? editMaintenance.description : newMaintenance.description}
        onChange={e => isEditing ?
          setEditMaintenance({ ...editMaintenance, description: e.target.value }) :
          setNewMaintenance({ ...newMaintenance, description: e.target.value })
        }
      />
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 ml-2"
        onClick={isEditing ? handleSaveEdit : handleAddMaintenance}
      >
        {isEditing ? 'Save' : 'Add Maintenance'}
      </button>
      <br />
      <Link className="text-blue-500 hover:text-blue-700 mt-4 block" to="/vehicle-management/vehicleList">Back to Vehicle List</Link>
    </div>
  );
};

export default VehicleDetails;
