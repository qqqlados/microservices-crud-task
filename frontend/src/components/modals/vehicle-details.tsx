import type { FC } from 'react';
import type { IVehicle } from '../../types/vehicle';

type VehicleDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Partial<IVehicle> | null;
};

export const VehicleDetailsModal: FC<VehicleDetailsModalProps> = ({ isOpen, onClose, vehicle }) => {
  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`} onClose={onClose}>
      <div className="modal-box relative">
        <button className="btn btn-sm btn-circle absolute right-4 top-4" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Vehicle details</h3>

        {vehicle ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <img src="/car.jpg" alt="Vehicle" className="w-40 h-30 object-cover rounded shadow-md" />
              <div>
                <p className="text-xl font-bold">
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="text-md text-gray-500">{vehicle.year}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">VIN:</span>
                <span className="font-semibold text-gray-800">{vehicle.vin}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">Color:</span>
                <span className="font-semibold text-gray-800">{vehicle.color}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">User ID:</span>
                <span className="font-semibold text-gray-800">{vehicle.userId}</span>
              </div>

              {vehicle.id !== undefined && (
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="font-medium text-gray-600">ID:</span>
                  <span className="font-semibold text-gray-800">{vehicle.id}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No vehicle selected</p>
        )}
      </div>
    </dialog>
  );
};
