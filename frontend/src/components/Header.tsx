import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserService } from '../services/user.service';
import { toast } from 'react-toastify';
import AccountEditModal from './modals/account-edit';
import { Loader } from './Loader';
// cookies helper used via getUserCookie
import { getUserCookie } from '../utils/auth';
import { User, Pencil, Trash2, LogOut, Truck, CircleUserRound } from 'lucide-react';
import { removeUserCookie } from '../utils/auth';

export const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth/sign-in' || location.pathname === '/auth/sign-up';
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(isAuthPage);

  // prefer helper which returns parsed object or null
  const user = getUserCookie();

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const res = await UserService.deleteUser(user!.id!);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      toast.success('Account deleted');
      removeUserCookie();
      navigate('/auth/sign-in');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-center px-4">
        {isAuthPage ? (
          <div className="flex items-center gap-2">
            <img src="/icons/vehicle.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-gray-800">Microservices CRUD Task</span>
          </div>
        ) : (
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 gap-3">
              <li>
                <NavLink to="/users" className={({ isActive }) => `text-lg flex gap-1 items-center transition-colors duration-200 ${isActive ? 'bg-blue-200' : 'text-gray-700'}`}>
                  <User className="w-5 h-5" />
                  Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/vehicles"
                  className={({ isActive }) => `text-lg flex gap-1 items-center transition-colors duration-200 ${isActive ? 'bg-blue-200' : 'text-gray-700'}`}
                >
                  <Truck className="w-5 h-5" />
                  Vehicles
                </NavLink>
              </li>

              <div className="dropdown dropdown-start z-50">
                <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-0 border-none mb-0 mt-0 ml-0 mr-0">
                  <CircleUserRound className="w-5 h-5 mr-1" />
                  <span className="text-lg font-normal text-gray-700">Profile</span>
                </div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <button onClick={() => setIsEditOpen(true)}>
                      <Pencil className="w-4 h-4" /> Edit account
                    </button>
                  </li>
                  <li>
                    <button onClick={handleDeleteAccount} className="flex items-center">
                      <Trash2 className="w-4 h-4" /> Delete account
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center"
                      onClick={() => {
                        UserService.signOut();
                        navigate('/auth/sign-in');
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        )}
      </div>
      {loading && <Loader />}

      <AccountEditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </>
  );
};
