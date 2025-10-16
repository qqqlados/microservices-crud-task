import vehicles from '../../../backend/prisma/vehicles.json';
import { useState } from 'react';
import { VehicleDetailsModal } from '../components/modals/vehicle-details';

export const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto h-[100vh] w-full p-4 pb-25">
      {vehicles.map((vehicle) => (
        <button
          key={`${vehicle.vin}`}
          className="card bg-base-100 shadow-sm p-2 text-left"
          onClick={() => {
            setSelected(vehicle);
            setOpen(true);
          }}
        >
          <figure>
            <img src="/car.jpg" alt="Vehicle" />
          </figure>
          <div className="pl-3 mt-2 flex items-end gap-2 justify-center">
            <p className="text-lg">
              <strong>{vehicle.make}</strong> {vehicle.model} {vehicle.year}
            </p>
          </div>
        </button>
      ))}

      <VehicleDetailsModal isOpen={open} onClose={() => setOpen(false)} vehicle={selected} />
    </div>
  );
};
