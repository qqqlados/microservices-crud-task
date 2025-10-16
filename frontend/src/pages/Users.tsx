import users from '../../../backend/prisma/users.json';
import { useState } from 'react';

import type { ICreateVehicle } from '../types/vehicle';
import { VehicleCreateModal } from '../components/modals/vehicle-create';

export const Users = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="p-4 h-[100vh] w-full overflow-y-auto pb-30">
      <div className="absolute right-20 top-3">
        <button className="btn btn-dash" onClick={() => setIsCreateOpen(true)}>
          +
          <img src="/icons/vehicle.svg" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div className="card bg-base-100 shadow-sm p-2">
            <figure>
              <img src="/user.png" alt="User" />
            </figure>
            <div className="pl-3 mt-2">
              <h2 className="card-title">{user.name}</h2>
              <p className="text-left">{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      <VehicleCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(vehicle: ICreateVehicle) => {
          console.log('Create vehicle:', vehicle);
        }}
      />
    </div>
  );
};
