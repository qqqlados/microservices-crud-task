import type { FC } from "react";
import type { IVehicle } from "../../types/vehicle";
import { useState, useEffect } from "react";
import { VehicleService } from "../../services/vehicle.service";
import { toast } from "react-toastify";
import { Loader } from "../Loader";
import VehicleEditModal from "./vehicle-edit";
import { Trash2 } from "lucide-react";

type VehicleDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Partial<IVehicle> | null;
  refetchVehicles: () => void;
};

export const VehicleDetailsModal: FC<VehicleDetailsModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  refetchVehicles,
}) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentVehicle, setCurrentVehicle] =
    useState<Partial<IVehicle> | null>(vehicle ?? null);

  // Keep local vehicle state in sync when parent prop changes
  console.log(currentVehicle);
  useEffect(() => {
    setCurrentVehicle(vehicle ?? null);
  }, [vehicle]);

  const handleDeleteVehicle = async () => {
    if (!vehicle?.id) return;
    if (!confirm("Delete this vehicle? This action cannot be undone.")) return;
    try {
      setLoading(true);
      const res = await VehicleService.deleteVehicle(vehicle.id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Vehicle deleted");
      refetchVehicles();
      onClose();
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const refetchVehicle = async () => {
    try {
      if (!currentVehicle?.id) return;
      const fresh = await VehicleService.getVehicleById(
        currentVehicle.id as number
      );
      if (fresh?.error) {
        toast.error(fresh.error);
        return;
      }
      refetchVehicles();
      setCurrentVehicle(fresh.data);
      setEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} onClose={onClose}>
      <div className="modal-box relative">
        <div className="absolute right-4 top-4 flex flex-col md:flex-row gap-2 items-end md:items-center">
          <button
            className="btn btn-sm btn-circle"
            onClick={() => setEditing(true)}
            aria-label="Edit vehicle"
          >
            ✎
          </button>
          <button
            className="btn btn-sm btn-circle"
            onClick={handleDeleteVehicle}
            aria-label="Delete vehicle"
          >
            <Trash2 width={16} height={16} />
          </button>
          <button
            className="btn btn-sm btn-circle"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <h3 className="font-bold text-lg mb-4">Vehicle details</h3>

        {currentVehicle ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <img
                src="/car.jpg"
                alt="Vehicle"
                className="w-40 h-30 object-cover rounded shadow-md"
              />
              <div>
                <p className="text-xl font-bold">
                  {currentVehicle.make} {currentVehicle.model}
                </p>
                <p className="text-md text-gray-500">{currentVehicle.year}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">VIN:</span>
                <span className="font-semibold text-gray-800">
                  {currentVehicle.vin}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">Color:</span>
                <span className="font-semibold text-gray-800">
                  {currentVehicle.color}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="font-medium text-gray-600">User ID:</span>
                <span className="font-semibold text-gray-800">
                  {currentVehicle.userId}
                </span>
              </div>

              {currentVehicle?.id !== undefined && (
                <div className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="font-medium text-gray-600">ID:</span>
                  <span className="font-semibold text-gray-800">
                    {currentVehicle.id}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No vehicle selected</p>
        )}
        {loading && <Loader />}
        <VehicleEditModal
          isOpen={editing}
          onClose={() => setEditing(false)}
          vehicle={currentVehicle}
          onUpdated={refetchVehicle}
        />
      </div>
    </dialog>
  );
};
