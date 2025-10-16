import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../Form';
import { Input } from '../Input';

type VehicleFormValues = {
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  userId: number;
};

type VehicleFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: VehicleFormValues) => void;
};

export const VehicleCreateModal: FC<VehicleFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const methods = useForm<VehicleFormValues>({
    defaultValues: {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      color: '',
      userId: 1,
    },
  });

  //TODO: grep userId from cookies etc.
  const userId = 7;

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`} onClose={onClose}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle absolute right-4 top-4" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Create Vehicle</h3>
        <Form
          methods={methods}
          onSubmit={(data) => {
            onSubmit({
              make: data.make,
              model: data.model,
              year: Number(data.year),
              vin: data.vin,
              color: data.color,
              userId,
            });
            onClose();
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Make" name="make" type="text" required />
            <Input label="Model" name="model" type="text" required />
            <Input label="Year" name="year" type="number" required className="text-center" />
            <Input label="VIN" name="vin" type="text" required />
            <Input label="Color" name="color" type="text" required />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
};
