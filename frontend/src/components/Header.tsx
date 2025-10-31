import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserService } from "../services/user.service";
import { toast } from "react-toastify";
import AccountEditModal from "./modals/account-edit";
import { VehicleCreateModal } from "./modals/vehicle-create";
import { Loader } from "./Loader";
// cookies helper used via getUserCookie
import { getUserCookie } from "../utils/auth";
import {
  User,
  Pencil,
  Trash2,
  LogOut,
  Truck,
  CircleUserRound,
} from "lucide-react";
import { removeUserCookie } from "../utils/auth";
import clsx from "clsx";

export const Header = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/auth/sign-in" ||
    location.pathname === "/auth/sign-up";
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const user = getUserCookie();

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      if (user && user.id) {
        const res = await UserService.deleteUser(user.id);
        if ((res as any).error) {
          toast.error(res.error);
          return;
        }
      }
      toast.success("Account deleted");
      removeUserCookie();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "navbar bg-base-100 shadow-sm flex justify-center md:justify-between px-4 relative",
          isAuthPage && "md:justify-center"
        )}
      >
        {isAuthPage ? (
          <div className="flex items-center gap-2">
            <img src="/icons/vehicle.svg" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-semibold text-gray-800 md:hidden">
              Microservices
            </span>
            <span className="hidden md:inline text-xl font-semibold text-gray-800">
              Microservices CRUD Task
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <img src="/icons/vehicle.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-semibold text-gray-800 md:hidden">
                Microservices
              </span>
              <span className="hidden md:inline text-xl font-semibold text-gray-800">
                Microservices CRUD Task
              </span>
            </div>

            <div className="flex-none hidden md:block relative right-[36%] top-0">
              <ul className="menu menu-horizontal px-1 pr-10 gap-3">
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `text-lg flex gap-1 items-center transition-colors duration-200 px-2 py-1 rounded-md ${
                        isActive ? "bg-blue-200" : "text-gray-700"
                      }`
                    }
                  >
                    <User className="w-5 h-5" />
                    Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/vehicles"
                    className={({ isActive }) =>
                      `text-lg flex gap-1 items-center transition-colors duration-200 px-2 py-1 rounded-md ${
                        isActive ? "bg-blue-200" : "text-gray-700"
                      }`
                    }
                  >
                    <Truck className="w-5 h-5" />
                    Vehicles
                  </NavLink>
                </li>

                <div className="dropdown dropdown-start z-50">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 flex items-center gap-0 border-none mb-0 mt-0 ml-0 mr-0"
                  >
                    <CircleUserRound className="w-5 h-5 mr-1" />
                    <span className="text-lg font-normal text-gray-700">
                      Profile
                    </span>
                  </div>
                  <ul
                    tabIndex={-1}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <button onClick={() => setIsEditOpen(true)}>
                        <Pencil className="w-4 h-4" /> Edit account
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDeleteAccount}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4" /> Delete account
                      </button>
                    </li>
                    <li>
                      <button
                        className="flex items-center"
                        onClick={() => {
                          UserService.signOut();
                          navigate("/auth/sign-in");
                        }}
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>

            <button
              className="md:hidden btn btn-dash btn-square absolute left-2 top-1/2 -translate-y-1/2 w-15"
              aria-label="Create vehicle"
              onClick={() => setIsCreateOpen(true)}
            >
              +
              <img src="/icons/vehicle.svg" />
            </button>

            <button
              className="md:hidden btn btn-ghost btn-square absolute right-2 top-1/2 -translate-y-1/2"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {!isAuthPage && mobileOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 flex">
            <div className="mobile-sheet-left bg-base-100 shadow-md rounded-r-xl h-full inline-block pl-2 pr-10">
              <ul className="flex flex-col p-3 items-start gap-3 w-max mt-10">
                <li>
                  <NavLink
                    to="/users"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-lg flex gap-2 items-center px-2 py-1 rounded-md ${
                        isActive ? "bg-blue-200" : "text-gray-700"
                      }`
                    }
                  >
                    <User className="w-5 h-5" /> Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/vehicles"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-lg flex gap-2 items-center px-2 py-1 rounded-md ${
                        isActive ? "bg-blue-200" : "text-gray-700"
                      }`
                    }
                  >
                    <Truck className="w-5 h-5" /> Vehicles
                  </NavLink>
                </li>
                <li className="menu-title mt-1">Account</li>
                <li>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => {
                      setIsEditOpen(true);
                      setMobileOpen(false);
                    }}
                  >
                    <Pencil className="w-4 h-4" /> Edit account
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => {
                      setMobileOpen(false);
                      handleDeleteAccount();
                    }}
                  >
                    <Trash2 className="w-4 h-4" /> Delete account
                  </button>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2"
                    onClick={() => {
                      UserService.signOut();
                      setMobileOpen(false);
                      navigate("/auth/sign-in");
                    }}
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}

      <AccountEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
      <VehicleCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
};
