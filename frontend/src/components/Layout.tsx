import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";
import { getUserCookie } from "../utils/auth";
export const Layout = () => {
  const user = getUserCookie();
  const location = useLocation();

  if (
    user &&
    (location.pathname === "/auth/sign-in" ||
      location.pathname === "/auth/sign-up")
  ) {
    return <Navigate to="/users" replace />;
  }

  if (
    !user &&
    location.pathname !== "/auth/sign-in" &&
    location.pathname !== "/auth/sign-up"
  ) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="flex flex-col gap-5 px-5 mx-auto h-screen overflow-hidden">
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <ToastContainer position="top-center" />
    </div>
  );
};
