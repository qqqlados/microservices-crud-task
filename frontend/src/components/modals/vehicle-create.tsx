import { useState, type FC } from "react";
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

// Use schema-derived types
type VehicleFormValues = CreateVehicleFormValues;

type VehicleFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const VehicleCreateModal: FC<VehicleFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<VehicleFormValues>({
    resolver: zodResolver(createVehicleSchema) as any,
    mode: "onChange",
    defaultValues: {
      make: "",
      model: "",
      year: 2025,
      vin: "",
      color: "",
      userId: 1,
    },
  });

  //TODO: grep userId from cookies etc.
  const userId = 7;

  const onSubmit = async (data: VehicleFormValues) => {
    try {
      setLoading(true);
      const res = await VehicleService.createVehicle({
        make: data.make,
        model: data.model,
        year: Number(data.year),
        vin: data.vin,
        color: data.color,
        userId: userId,
      });
      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Vehicle created successfully");
    } catch (error) {
      console.error(error);
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
        <h3 className="font-bold text-lg mb-4">Create Vehicle</h3>
        <Form
          methods={methods}
          onSubmit={async (data) => {
            await onSubmit(data);
            onClose();
          }}
        >
          <div className="!grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              disabled={
                loading ||
                !methods.formState.isValid ||
                !methods.formState.isDirty
              }
              className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
};
