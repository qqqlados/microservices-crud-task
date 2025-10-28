import { useState, type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createVehicleSchema,
  type CreateVehicleFormValues,
} from "../../lib/schemas/vehicle.schema";
import { Form } from "../Form";
import { Input } from "../Input";
import { VehicleService } from "../../services/vehicle.service";
import { toast } from "react-toastify";
import { Loader } from "../Loader";
import type { IVehicle } from "../../types/vehicle";

type VehicleEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Partial<IVehicle> | null;
  onUpdated?: (updated: Partial<IVehicle>) => void;
};

export const VehicleEditModal: FC<VehicleEditModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onUpdated,
}) => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<CreateVehicleFormValues>({
    resolver: zodResolver(createVehicleSchema) as any,
    mode: "onChange",
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      vin: "",
      color: "",
      userId: vehicle?.userId ?? 1,
    },
  });

  useEffect(() => {
    if (!isOpen || !vehicle) return;
    try {
      methods.reset({
        make: vehicle.make ?? "",
        model: vehicle.model ?? "",
        year: vehicle.year ?? new Date().getFullYear(),
        vin: vehicle.vin ?? "",
        color: vehicle.color ?? "",
        userId: vehicle.userId ?? 1,
      });
    } catch (e) {}
  }, [isOpen, vehicle]);

  const onSubmit = async (data: CreateVehicleFormValues) => {
    if (!vehicle?.id) {
      toast.error("No vehicle selected");
      return;
    }
    try {
      setLoading(true);
      const res = await VehicleService.updateVehicle(vehicle.id, data as any);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Vehicle updated");
      // If parent provided a callback, notify it with updated vehicle
      try {
        if (typeof onUpdated === "function") {
          await onUpdated(res);
        }
      } catch (err) {
        console.error("onUpdated callback failed", err);
      }
      onClose();
    } catch (e) {
      console.error(e);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} onClose={onClose}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-4 top-4"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit vehicle</h3>
        <Form methods={methods} onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Make"
              name="make"
              type="text"
              required
              placeholder="Toyota"
            />
            <Input
              label="Model"
              name="model"
              type="text"
              required
              placeholder="Corolla"
            />
            <Input
              label="Year"
              name="year"
              type="number"
              required
              className="text-center"
              placeholder="2020"
            />
            <Input
              label="VIN"
              name="vin"
              type="text"
              required
              placeholder="1HGCM82633A123456"
              max={15}
            />
            <Input
              label="Color"
              name="color"
              type="text"
              required
              placeholder="Silver"
            />
          </div>
          {loading && <Loader />}
          <div className="modal-action">
            <button
              type="submit"
              disabled={loading || !methods.formState.isDirty}
              className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
};

export default VehicleEditModal;
