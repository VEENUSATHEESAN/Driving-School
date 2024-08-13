import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { VehicleContext } from './VehicleContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VehicleList.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const VehicleList = ({ theme }) => {
  const { vehicles, deleteVehicle } = useContext(VehicleContext);

  const handleDelete = (vehicleId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this vehicle?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteVehicle(vehicleId);
            toast.success('Vehicle deleted successfully!');
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  if (!Array.isArray(vehicles)) {
    return <div>No vehicles available</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Vehicle List</h1>
      <ul className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {vehicles.map(vehicle => (
          <li key={vehicle._id} className="flex justify-between items-center space-x-4 p-4 border-b border-gray-300">
            <Link to={`/vehicle-management/vehicle/${vehicle._id}`} className="text-blue-500 hover:text-blue-700 flex-1">{vehicle.name}</Link>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 w-24 text-center"
                onClick={() => handleDelete(vehicle._id)}
              >
                Delete
              </button>
              <Link to={`/vehicle-management/edit/${vehicle._id}`}>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 w-24 text-center">
                  Edit
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
