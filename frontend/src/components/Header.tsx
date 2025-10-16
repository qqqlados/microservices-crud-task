import { NavLink, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
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
                <img src="/icons/user.svg" alt="" className="w-5 h-5" />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink to="/vehicles" className={({ isActive }) => `text-lg flex gap-1 items-center transition-colors duration-200 ${isActive ? 'bg-blue-200' : 'text-gray-700'}`}>
                <img src="/icons/vehicle.svg" alt="" className="w-5 h-5" />
                Vehicles
              </NavLink>
            </li>

            <li>
              <NavLink to="/sign-in" className={({ isActive }) => `text-lg flex gap-1 items-center transition-colors duration-200 ${isActive ? 'bg-blue-200' : 'text-gray-700'}`}>
                <img src="/icons/log-out.svg" alt="" className="w-5 h-5" />
                Log out
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
