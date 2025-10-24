import { useEffect, useState } from 'react';

import { VehicleCreateModal } from '../components/modals/vehicle-create';
import { Loader } from '../components/Loader';
import type { IUser } from '../types/user';
import { UserService } from '../services/user.service';

export const Users = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [users, setUsers] = useState<IUser[] | []>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UserService.getUsers();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 h-[100vh] w-full overflow-y-auto pb-30 relative">
      <div className="fixed right-20 top-3">
        <button className="btn btn-dash" onClick={() => setIsCreateOpen(true)}>
          +
          <img src="/icons/vehicle.svg" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.length > 0 &&
          users.map((user) => (
            <div className="card bg-base-100 shadow-sm p-2">
              <figure>
                <img src="/user.png" alt="User" onLoad={() => setImagesLoaded(true)} />
              </figure>
              <div className="pl-3 mt-2">
                <h2 className="card-title">{user.name}</h2>
                <p className="text-left">{user.email}</p>
              </div>
            </div>
          ))}
      </div>

      <VehicleCreateModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      {!imagesLoaded && <Loader overlayStyle="bg-white" />}
    </div>
  );
};
