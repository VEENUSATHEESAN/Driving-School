import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => {
        console.error('Error fetching vehicles:', err);
        setVehicles([]);
      });
  }, []);

  const addVehicle = (vehicle) => {
    axios.post('http://localhost:5000/api/vehicles', vehicle)
      .then(res => setVehicles([...vehicles, res.data]))
      .catch(err => console.error('Error adding vehicle:', err));
  };

  const updateVehicle = (updatedVehicle) => {
    axios.put(`http://localhost:5000/api/vehicles/${updatedVehicle._id}`, updatedVehicle)
      .then(res => setVehicles(vehicles.map(vehicle => vehicle._id === updatedVehicle._id ? res.data : vehicle)))
      .catch(err => console.error('Error updating vehicle:', err));
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      throw new Error('Failed to delete vehicle'); // Rethrow the error to be caught by the caller
    }
  };

  const getVehicleById = (id) => vehicles.find(vehicle => vehicle._id === id);

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleById }}>
      {children}
    </VehicleContext.Provider>
  );
};
