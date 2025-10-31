// import vehicles from '../../../backend/prisma/vehicles.json';
import { useEffect, useState } from "react";
import { VehicleDetailsModal } from "../components/modals/vehicle-details";
import { VehicleService } from "../services/vehicle.service";
import type { IVehicle } from "../types/vehicle";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";

export const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [vehicles, setVehicles] = useState<IVehicle[] | []>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await VehicleService.getVehicles();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setVehicles(data.data);
    };
    fetchVehicles();
  }, []);

  const refetchVehicles = async () => {
    try {
      const fresh = await VehicleService.getVehicles();
      if (fresh?.error) {
        toast.error(fresh.error);
        return;
      }
      setVehicles(fresh.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto h-[100vh] w-full p-4 pb-25">
      {vehicles &&
        vehicles.length > 0 &&
        vehicles.map((vehicle) => (
          <button
            key={`${vehicle.vin}`}
            className="card bg-base-100 shadow-sm p-2 text-left"
            onClick={() => {
              setSelected(vehicle);
              setOpen(true);
            }}
          >
            <figure>
              <img
                src="/car.jpg"
                alt="Vehicle"
                onLoad={() => setImagesLoaded(true)}
              />
            </figure>
            <div className="pl-3 mt-2 flex items-end gap-2 justify-center">
              <p className="text-lg">
                <strong>{vehicle.make}</strong> {vehicle.model} {vehicle.year}
              </p>
            </div>
          </button>
        ))}

      <VehicleDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        vehicle={selected}
        refetchVehicles={refetchVehicles}
      />

      {!imagesLoaded && <Loader overlayStyle="bg-white" />}
    </div>
  );
};
